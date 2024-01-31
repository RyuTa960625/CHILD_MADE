package com.d209.childmade.room.service;

import com.d209.childmade.book.entity.Book;
import com.d209.childmade.book.repository.BookRepository;
import com.d209.childmade.member.entity.Member;
import com.d209.childmade.member.repository.MemberRepository;
import com.d209.childmade.role.entity.Role;
import com.d209.childmade.role.repository.RoleRepository;
import com.d209.childmade.room.dto.request.RoomJoinRequestDto;
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
     *  방에 접속할 수 있는 토큰을 반환한다
     */
    @Transactional
    public RoomJoinResponseDto roomJoin(int memberId, RoomJoinRequestDto roomJoinRequestDto)
            throws OpenViduJavaClientException, OpenViduHttpException {

        List<Room> findRoom = roomRepository.findRoom(
                roomJoinRequestDto.getBookId(), roomJoinRequestDto.getRoleId());

        Optional<Book> book = bookRepository.findById(roomJoinRequestDto.getBookId());
        Optional<Role> role = roleRepository.findById(roomJoinRequestDto.getRoleId());
        Optional<Member> member = memberRepository.findById(memberId);
        Room room = null;
        String token = null;
        Session session = null;


        if (member.isEmpty() && role.isEmpty()) {
            //오류 처리
        }
        if(!findRoom.isEmpty()){

            //동화와 역할에 맞는 Room이 존재하는 경우
            room = findRoom.get(0);
            String sessionId = room.getRoomSessionName();
            session = openvidu.getActiveSession(sessionId);
            //찾은 세션이 현재 사용되는 세션이아닐 경우 오류 처리

            //방 정보 업데이트
            int curNum = room.incrementCurNum();
        }
        else{
            //동화와 역할에 맞는 Room이 존재하지 않는 경우
            String uuid = UUID.randomUUID().toString();
            Map<String, Object> sessionParams = new HashMap<>();

            sessionParams.put("customSessionId",uuid);
            SessionProperties sessionProperties = SessionProperties.fromJson(sessionParams).build();
            session = openvidu.createSession(sessionProperties);

            // Room을 DB에 저장
            room = roomRepository.save(Room.of(1, RoomStatus.WAITING,session.getSessionId(),book.get()));

        }

        // MemberRoom을 생성하고 저장
        MemberRoom memberRoom = MemberRoom.of(true, member.get(), room, role.get());
        memberRoomRepository.save(memberRoom);
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
        Optional<Room> room = roomRepository.findById(roomId);
        if(room.isPresent()){
            if(roomStatus.name().equals("PROCEEDING")) room.get().updateRoomStatusProceeding();
            else if(roomStatus.name().equals("FINISHED")) {
                room.get().updateRoomStatusFinished();
            }
        }
    }
}
