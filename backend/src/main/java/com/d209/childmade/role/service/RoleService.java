package com.d209.childmade.role.service;

import com.d209.childmade._common.exception.CustomBadRequestException;
import com.d209.childmade._common.response.ErrorType;
import com.d209.childmade.role.dto.response.HelperListResponseDto;
import com.d209.childmade.role.entity.Helper;
import com.d209.childmade.role.entity.Role;
import com.d209.childmade.role.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public List<HelperListResponseDto> findHelperListByRole(int roleId) {
        Optional<Role> role = roleRepository.findById(roleId);
        if (role.isEmpty()) {
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_ROLE);
        }
        List<Helper> helperList = role.get().getHelpers();
        if (helperList.isEmpty()) {
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_HELPER_BY_ROLEID);
        }
        return helperList.stream().map(HelperListResponseDto::of).toList();
    }
}
