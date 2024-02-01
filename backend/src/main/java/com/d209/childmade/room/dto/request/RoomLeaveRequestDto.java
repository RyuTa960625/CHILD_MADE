package com.d209.childmade.room.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RoomLeaveRequestDto {

    private int memberId;
    private long roomId;

    @Builder
    private RoomLeaveRequestDto(int memberId, int roomId) {
        this.memberId = memberId;
        this.roomId = roomId;
    }

    public static RoomLeaveRequestDto of(int memberId, int roomId) {
        return builder()
                .memberId(memberId)
                .roomId(roomId)
                .build();
    }

}
