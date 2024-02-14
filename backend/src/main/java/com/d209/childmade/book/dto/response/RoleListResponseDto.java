package com.d209.childmade.book.dto.response;

import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
public class RoleListResponseDto {

    private final String title;
    private final String summary;
    private final String bookImageUrl;

    private List<RoleListDto> roleListDtoList = new ArrayList<>();

    @Builder
    private RoleListResponseDto(String title, String summary, String bookImageUrl, List<RoleListDto> roleListDtoList){
        this.title = title;
        this.summary = summary;
        this.bookImageUrl = bookImageUrl;
        this.roleListDtoList = roleListDtoList;
    }

    public static RoleListResponseDto of(String title, String summary, String bookImageUrl, List<RoleListDto> roleListDtoList){
        return builder()
                .title(title)
                .summary(summary)
                .bookImageUrl(bookImageUrl)
                .roleListDtoList(roleListDtoList)
                .build();
    }
}
