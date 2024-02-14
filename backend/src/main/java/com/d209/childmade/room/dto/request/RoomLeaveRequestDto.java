package com.d209.childmade.room.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RoomLeaveRequestDto {

    private Integer memberId;
    private Long roomId;
}
