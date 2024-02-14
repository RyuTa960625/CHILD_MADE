package com.d209.childmade.role.controller;

import com.d209.childmade._common.response.SuccessResponse;
import com.d209.childmade._common.response.SuccessType;
import com.d209.childmade.role.dto.response.HelperListResponseDto;
import com.d209.childmade.role.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @GetMapping("{role-id}/helpers")
    public SuccessResponse<List<HelperListResponseDto>> getHelper(@PathVariable("role-id") int roleId){
        return SuccessResponse.of(SuccessType.ROLE_LIST_SUCCESSFULLY,roleService.findHelperListByRole(roleId));
    }
}
