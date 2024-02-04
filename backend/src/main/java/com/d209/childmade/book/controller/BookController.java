package com.d209.childmade.book.controller;

import com.d209.childmade._common.response.SuccessResponse;
import com.d209.childmade._common.response.SuccessType;
import com.d209.childmade.book.dto.response.BookListResponseDto;
import com.d209.childmade.book.dto.response.RoleListDto;
import com.d209.childmade.book.dto.response.RoleListResponseDto;
import com.d209.childmade.book.dto.response.ScriptListResponseDto;
import com.d209.childmade.book.entity.Book;
import com.d209.childmade.book.entity.Script;
import com.d209.childmade.book.repository.BookRepository;
import com.d209.childmade.book.repository.ScriptRepository;
import com.d209.childmade.role.entity.Role;
import com.d209.childmade.role.repository.RoleRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookRepository bookRepository;
    private final ScriptRepository scriptRepository;
    private final RoleRepository roleRepository;
    @GetMapping("/")
    public SuccessResponse<Page<BookListResponseDto>> bookList(Pageable pageable) {
        Page<Book> page = bookRepository.findAll(pageable);
        return SuccessResponse.of(SuccessType.BOOK_LIST_SUCCESSFULLY,page.map(BookListResponseDto::of));
    }

    @GetMapping("/{book-id}")
    public SuccessResponse<List<ScriptListResponseDto>> scriptList(@PathVariable("book-id") int bookId, @RequestParam("branch-num") int branchNum ) {
        List<Script> scripts = scriptRepository.findAllByBookIdAndBranchNum(bookId,branchNum);
        return SuccessResponse.of(SuccessType.SCRIPT_LIST_SUCCESSFULLY,scripts.stream().map(ScriptListResponseDto::of).toList());
    }

    @GetMapping("/{book-id}/roles")
    public SuccessResponse<RoleListResponseDto> roleList(@PathVariable("book-id") int bookId) {
        List<Role> roles = roleRepository.findAllByBookId(bookId);
        List<RoleListDto> roleListDtos = roles.stream().map(RoleListDto::new).toList();
        Optional<Book> book = bookRepository.findById(bookId);

        if(book.isEmpty()){
            //오류 처리
        }
        RoleListResponseDto roleListResponseDto = RoleListResponseDto.of(book.get().getSummary(), roleListDtos);
        return SuccessResponse.of(SuccessType.ROLE_LIST_SUCCESSFULLY,roleListResponseDto);
    }
}
