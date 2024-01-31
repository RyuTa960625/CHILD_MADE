package com.d209.childmade.room.controller;

import com.d209.childmade._common.response.SuccessResponse;
import com.d209.childmade._common.response.SuccessType;
import com.d209.childmade.room.dto.request.RoomJoinRequestDto;
import com.d209.childmade.room.dto.response.RoomJoinResponseDto;
import com.d209.childmade.room.entity.RoomStatus;
import com.d209.childmade.room.service.RoomService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PutMapping("/{member_id}")
    public SuccessResponse<RoomJoinResponseDto> roomJoin(@PathVariable("member_id") int memberId, @RequestBody RoomJoinRequestDto roomJoinRequestDto) throws OpenViduJavaClientException, OpenViduHttpException {
        return SuccessResponse.of(SuccessType.LOGIN_SUCCESSFULLY, roomService.roomJoin(memberId, roomJoinRequestDto));
    }

    @PutMapping("/{roodId}/leave")
    public SuccessResponse<Void> changeRoomStatusLeave(@PathVariable("roodId") long roomId, @PathVariable("roomStatus")RoomStatus roomStatus){
        roomService.changeRoomStatus(roomId,RoomStatus.FINISHED);
        return SuccessResponse.from(SuccessType.ROOM_JOIN_SUCCESSFULLY);
    }
    @PutMapping("/{roodId}/start")
    public SuccessResponse<Void> changeRoomStatusProceeding(@PathVariable("roodId") long roomId){
        roomService.changeRoomStatus(roomId,RoomStatus.PROCEEDING);
        return SuccessResponse.from(SuccessType.ROOM_JOIN_SUCCESSFULLY);
    }
}

