package com.d209.childmade.book.dto.response;

import com.d209.childmade.role.entity.Role;
import lombok.Getter;

@Getter
public class RoleListDto {

    private Integer roleId;
    private String roleName;
    private String imageUrl;

    public RoleListDto(Role role) {
        this.roleId = role.getId();
        this.roleName = role.getRoleName();
        this.imageUrl = role.getImageUrl();
    }
}
