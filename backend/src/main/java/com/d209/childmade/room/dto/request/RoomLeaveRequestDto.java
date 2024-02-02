package com.d209.childmade.room.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RoomLeaveRequestDto {

    private int memberId;
    private long roomId;
}
