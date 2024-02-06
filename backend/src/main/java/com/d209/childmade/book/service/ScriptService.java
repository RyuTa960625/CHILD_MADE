package com.d209.childmade.book.service;

import com.d209.childmade._common.exception.CustomBadRequestException;
import com.d209.childmade._common.response.ErrorType;
import com.d209.childmade.book.dto.request.ScriptListRequestDto;
import com.d209.childmade.book.entity.Script;
import com.d209.childmade.book.repository.ScriptRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ScriptService {

    private final ScriptRepository scriptRepository;

    public List<Script> findScriptList(int bookId, ScriptListRequestDto scriptListRequestDto) {
        List<Script> scriptList = scriptRepository.findAllByBookIdAndBranchNum(bookId,
                scriptListRequestDto.getBranchNum());
        if(scriptList.isEmpty()){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_SCRIPT_LIST);
        }
        return scriptList;
    }
}
