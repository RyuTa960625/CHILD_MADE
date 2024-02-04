package com.d209.childmade.role.repository;

import com.d209.childmade.role.entity.Role;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    List<Role> findAllByBookId(int bookId);
}
