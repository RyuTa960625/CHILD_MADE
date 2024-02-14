package com.d209.childmade.role.dto.response;

import com.d209.childmade.role.entity.Helper;
import lombok.Builder;
import lombok.Getter;

@Getter
public class HelperListResponseDto {

    private final Long helperId;
    private final int situationNum;
    private final String helperLine;
    private final String motionUrl;
    private final String audioUrl;

    @Builder
    private HelperListResponseDto(Helper helper){
        this.helperId = helper.getId();
        this.situationNum = helper.getSituationNum();
        this.helperLine = helper.getHelperLine();
        this.motionUrl = helper.getMotionUrl();
        this.audioUrl = helper.getAudioUrl();
    }

    public static HelperListResponseDto of(Helper helper){
        return builder()
                .helper(helper)
                .build();
    }
}
