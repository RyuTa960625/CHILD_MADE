package com.d209.childmade.member.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UpdateProfileResponseDto {

    private String profile;

    public UpdateProfileResponseDto(String profile) {
        this.profile = profile;
    }
}
