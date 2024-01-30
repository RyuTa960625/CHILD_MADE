package com.d209.childmade.room.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RoomJoinResponseDto {

    private final Long roomId;
    private final int curNum;
    private final String token;


    @Builder
    private RoomJoinResponseDto(Long roomId, int curNum, String token) {
        this.roomId = roomId;
        this.curNum = curNum;
        this.token = token;
    }

    public static RoomJoinResponseDto of(Long roomId,int curNum, String token) {
        return builder()
                .roomId(roomId)
                .curNum(curNum)
                .token(token)
                .build();
    }
}