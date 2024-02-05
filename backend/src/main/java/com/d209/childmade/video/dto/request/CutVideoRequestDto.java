package com.d209.childmade.video.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CutVideoRequestDto {

    private final Long roomId;
    private final int scriptNum;

    @Builder
    private CutVideoRequestDto(Long roomId, int scriptNum){
        this.roomId = roomId;
        this.scriptNum = scriptNum;
    }

    public static CutVideoRequestDto of(Long roomId, int scriptNum){
        return builder().roomId(roomId).scriptNum(scriptNum).build();
    }
}
