package com.d209.childmade.book.controller;

import com.d209.childmade._common.response.SuccessResponse;
import com.d209.childmade._common.response.SuccessType;
import com.d209.childmade.book.dto.request.ScriptListRequestDto;
import com.d209.childmade.book.dto.response.BookListResponseDto;
import com.d209.childmade.book.dto.response.RoleListResponseDto;
import com.d209.childmade.book.dto.response.ScriptListResponseDto;
import com.d209.childmade.book.entity.Book;
import com.d209.childmade.book.entity.Script;
import com.d209.childmade.book.service.BookService;
import com.d209.childmade.book.service.ScriptService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;
    private final ScriptService scriptService;

    @GetMapping("/")
    public SuccessResponse<Page<BookListResponseDto>> bookList(Pageable pageable) {
        Page<Book> page = bookService.findBookList(pageable);
        return SuccessResponse.of(SuccessType.BOOK_LIST_SUCCESSFULLY,page.map(BookListResponseDto::of));
    }

    @GetMapping("/{book-id}")
    public SuccessResponse<List<ScriptListResponseDto>> scriptList(@PathVariable("book-id") int bookId, @RequestBody
            ScriptListRequestDto scriptListRequestDto) {
        List<Script> scripts = scriptService.findScriptList(bookId,scriptListRequestDto);
        return SuccessResponse.of(SuccessType.SCRIPT_LIST_SUCCESSFULLY,scripts.stream().map(ScriptListResponseDto::of).toList());
    }

    @GetMapping("/{book-id}/roles")
    public SuccessResponse<RoleListResponseDto> roleList(@PathVariable("book-id") int bookId) {
        return SuccessResponse.of(SuccessType.ROLE_LIST_SUCCESSFULLY,bookService.findRoleListByBook(bookId));
    }
}
