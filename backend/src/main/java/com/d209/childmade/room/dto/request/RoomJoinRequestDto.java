package com.d209.childmade.room.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RoomJoinRequestDto {
    private int roleId;
    private int bookId;

    @Builder
    private RoomJoinRequestDto(int roleId, int bookId) {
        this.roleId = roleId;
        this.bookId = bookId;
    }

    public static RoomJoinRequestDto of(int roleId, int bookId) {
        return builder()
                .roleId(roleId)
                .bookId(bookId)
                .build();
    }
}
