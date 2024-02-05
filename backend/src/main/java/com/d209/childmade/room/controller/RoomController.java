package com.d209.childmade.room.controller;

import com.d209.childmade._common.response.SuccessResponse;
import com.d209.childmade._common.response.SuccessType;
import com.d209.childmade.room.dto.request.RoomJoinRequestDto;
import com.d209.childmade.room.dto.request.RoomLeaveRequestDto;
import com.d209.childmade.room.dto.response.RoomJoinResponseDto;
import com.d209.childmade.room.entity.RoomStatus;
import com.d209.childmade.room.service.RoomService;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PutMapping("/{member-id}")
    public SuccessResponse<RoomJoinResponseDto> roomJoin(@PathVariable("member-id") int memberId, @RequestBody RoomJoinRequestDto roomJoinRequestDto) throws OpenViduJavaClientException, OpenViduHttpException {
        return SuccessResponse.of(SuccessType.ROOM_JOIN_SUCCESSFULLY, roomService.roomJoin(memberId, roomJoinRequestDto));
    }

    @PutMapping("/{room-id}/start")
    public SuccessResponse<Void> changeRoomStatusProceeding(@PathVariable("room-id") long roomId){
        roomService.changeRoomStatus(roomId,RoomStatus.PROCEEDING);
        return SuccessResponse.from(SuccessType.UPDATE_ROOM_START_SUCCESSFULLY);
    }

    @PutMapping("/{room-id}/finish")
    public SuccessResponse<Void> changeRoomStatusLeave(@PathVariable("room-id") long roomId){
        roomService.changeRoomStatus(roomId,RoomStatus.FINISHED);
        return SuccessResponse.from(SuccessType.UPDATE_ROOM_FINISH_SUCCESSFULLY);
    }

    @DeleteMapping("/leave")
    public SuccessResponse<Void> roomLeave(@RequestBody RoomLeaveRequestDto roomLeaveRequestDto){
        roomService.roomLeave(roomLeaveRequestDto);
        return SuccessResponse.from(SuccessType.ROOM_LEAVE_SUCCESSFULLY);
    }
}
