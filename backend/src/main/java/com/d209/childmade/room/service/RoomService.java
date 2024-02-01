package com.d209.childmade.room.service;

import com.d209.childmade.book.entity.Book;
import com.d209.childmade.book.repository.BookRepository;
import com.d209.childmade.member.entity.Member;
import com.d209.childmade.member.repository.MemberRepository;
import com.d209.childmade.role.entity.Role;
import com.d209.childmade.role.repository.RoleRepository;
import com.d209.childmade.room.dto.request.RoomJoinRequestDto;
import com.d209.childmade.room.dto.request.RoomLeaveRequestDto;
import com.d209.childmade.room.dto.response.RoomJoinResponseDto;
import com.d209.childmade.room.entity.MemberRoom;
import com.d209.childmade.room.entity.Room;
import com.d209.childmade.room.entity.RoomStatus;
import com.d209.childmade.room.repository.MemberRoomRepository;
import com.d209.childmade.room.repository.RoomRepository;
import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import jakarta.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final BookRepository bookRepository;
    private final MemberRoomRepository memberRoomRepository;
    private final MemberRepository memberRepository;
    private final RoleRepository roleRepository;

    @Value("${openvidu.url}")
    private String OPENVIDU_URL;

    @Value("${openvidu.secret}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;
    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }


    /**
     * 자동 방 배정 메서드
     * 동화와 역할에 맞는 방이 있는 경우 해당 방의 토큰을 반환한다
     * 동화와 역할에 맞는 방이 없는 경우 방을 생성하고 해당 방의 토큰을 반환한다
     *
     * memberId : 요청한 사용자 ID (memberRoom table에 추가된다)
     * roomJoinRequestDto : bookId와 roleId를 가지고 있는 변수
     *
     *  return : 방에 접속할 수 있는 토큰을 반환한다
     */
    @Transactional
    public RoomJoinResponseDto roomJoin(int memberId, RoomJoinRequestDto roomJoinRequestDto)
            throws OpenViduJavaClientException, OpenViduHttpException {

        Role role = null;
        Member member = null;
        Book book = null;
        Room room = null;
        String token = null;
        Session session = null;

        Pageable pageable = PageRequest.of(0, 1);
        List<Room> findRoom = roomRepository.findByBookIdAndRoomStatusAndNotRoleIdOrderByCreatedAtAsc(roomJoinRequestDto.getBookId(),roomJoinRequestDto.getRoleId(),pageable);

        Optional<Role> findRole = roleRepository.findById(roomJoinRequestDto.getRoleId());
        Optional<Member> findMember = memberRepository.findById(memberId);

        if(findRole.isEmpty() || findMember.isEmpty()){
            //전달받은 member가 없거나 선택한 역할에 해당하는 데이터가 없을 때 오류 처리
        }else{
            role = findRole.get();
            member = findMember.get();
        }

        if(findRoom.isEmpty()){

            //동화와 역할에 맞는 Room이 존재하지 않는 경우
            String uuid = UUID.randomUUID().toString();
            Map<String, Object> sessionParams = new HashMap<>();

            sessionParams.put("customSessionId",uuid);
            SessionProperties sessionProperties = SessionProperties.fromJson(sessionParams).build();
            session = openvidu.createSession(sessionProperties);

            Optional<Book> findBook = bookRepository.findById(roomJoinRequestDto.getBookId());
            
            if(findBook.isEmpty()){
                //찾는 book 데이터가 없을 경우 오류처리
            }
            else {
                book = findBook.get();
            }
            // Room을 DB에 저장
            room = roomRepository.save(Room.of(1, RoomStatus.WAITING,session.getSessionId(),book));
            memberRoomRepository.save(MemberRoom.of(true, member, room, role));
        }
        else{
            //동화와 역할에 맞는 Room이 존재하는 경우
            room = findRoom.get(0);
            String sessionId = room.getRoomSessionName();
            session = openvidu.getActiveSession(sessionId);
            //찾은 세션이 현재 사용되는 세션이아닐 경우 오류 처리

            //방 정보 업데이트
            room.incrementCurNum();
            memberRoomRepository.save(MemberRoom.of(false, member, room, role));
        }

        // MemberRoom을 생성하고 저장

        //찾은 방 세션에 접근할 수 있는 토큰 발급
        Map<String, Object> params = new HashMap<>();
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        token = connection.getToken();

        return RoomJoinResponseDto.of(room.getId(),room.getCurNum(),token);
    }


    /**
     *  방 상태 변경 메서드
     *
     *  roomId : 상태를 바꿀 방 번호
     *  roomStatus : 바꿀 방 상태 ( WAITING, PROCEEDING ,FINISHED )
     *
     */
    public void changeRoomStatus(long roomId, RoomStatus roomStatus) {
        Optional<Room> findRoom = roomRepository.findById(roomId);
        if(findRoom.isEmpty()){
            //전달 받은 방이 없을 때 오류 처리
        }
        else{
            if(roomStatus.name().equals("PROCEEDING")) findRoom.get().updateRoomStatusProceeding();
            else if(roomStatus.name().equals("FINISHED")) {
                findRoom.get().updateRoomStatusFinished();
            }
        }
    }

    /**
     * 방 대기 상태에서 사용자가 나갔을 때 방정보와 사용자방 정보를 업데이트 하는 함수
     *
     * 모든 사람이 나갔을 때 방상태를 FINISHED
     * 나간 사람이 방장이였는 경우 다른 사람에게 방장을 넘김
     * 나간 방의 curNum--, 나간 사람에 대한 사용자 방정보 삭제
     *
     */
    @Transactional
    public void roomLeave(RoomLeaveRequestDto roomLeaveRequestDto){
        Optional<Room> findRoom = roomRepository.findById(roomLeaveRequestDto.getRoomId());
        if(findRoom.isEmpty()){
            //전달 받은 방이 없을 때 오류 처리
        }
        else{
            Room room = findRoom.get();
            room.decreaseCurNum();
            if(room.getCurNum() == 0){
                //방에 있는 모든 사람이 나갈 경우
                changeRoomStatus(room.getId(),RoomStatus.FINISHED);
            }

            Optional<MemberRoom> findMemberRoom = memberRoomRepository.findByMemberId(roomLeaveRequestDto.getMemberId());
            if(findMemberRoom.isEmpty()){
                //오류 처리
            }
            else{
                MemberRoom memberRoom = findMemberRoom.get();
                
                //삭제하려는 사용자가 방장일 경우 방장을 다른 사람에게 넘겨 줌
                if(memberRoom.isBoss()){
                    Pageable pageable = PageRequest.of(0, 1);
                    List<MemberRoom> findMemberRooms = memberRoomRepository.findAllByRoomIdAndMemberRoomIdNot(roomLeaveRequestDto.getRoomId(),memberRoom.getId(),
                            pageable);
                    findMemberRooms.get(0).updateBoss();
                }
                memberRoomRepository.delete(memberRoom);
            }

        }
    }
}
