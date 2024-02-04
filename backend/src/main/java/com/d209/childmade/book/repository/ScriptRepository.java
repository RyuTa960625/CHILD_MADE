package com.d209.childmade.book.repository;

import com.d209.childmade.book.entity.Script;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScriptRepository extends JpaRepository<Script, Long> {
    List<Script> findAllByBookIdAndBranchNum(int bookId, int branchNum);
}
