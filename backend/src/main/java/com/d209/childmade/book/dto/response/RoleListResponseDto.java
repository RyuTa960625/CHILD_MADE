package com.d209.childmade.book.dto.response;

import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
public class RoleListResponseDto {

    private final String summary;
    private List<RoleListDto> roleListDtoList = new ArrayList<>();

    @Builder
    private RoleListResponseDto(String summary, List<RoleListDto> roleListDtoList){
        this.summary = summary;
        this.roleListDtoList = roleListDtoList;
    }

    public static RoleListResponseDto of(String summary,List<RoleListDto> roleListDtoList){
        return builder()
                .summary(summary)
                .roleListDtoList(roleListDtoList)
                .build();
    }
}
