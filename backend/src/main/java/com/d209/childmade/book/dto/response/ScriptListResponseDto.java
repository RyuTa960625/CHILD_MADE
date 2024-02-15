package com.d209.childmade.book.dto.response;

import com.d209.childmade.book.entity.Script;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ScriptListResponseDto {

    private final int roleId;
    private final int scriptNum;
    private final String scriptLine;
    private final String videoUrl;
    private final int branchNum;

    @Builder
    private ScriptListResponseDto(Script script) {
        this.roleId = script.getRole().getId();
        this.scriptNum = script.getScriptNum();
        this.scriptLine = script.getScriptLine();
        this.videoUrl = script.getVideoUrl();
        this.branchNum = script.getBranchNum();
    }

    public static ScriptListResponseDto of(Script script){
        return builder()
                .script(script)
                .build();
    }
}