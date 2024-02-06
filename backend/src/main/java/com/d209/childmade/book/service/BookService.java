package com.d209.childmade.book.service;

import com.d209.childmade._common.exception.CustomBadRequestException;
import com.d209.childmade._common.response.ErrorType;
import com.d209.childmade.book.dto.response.RoleListDto;
import com.d209.childmade.book.dto.response.RoleListResponseDto;
import com.d209.childmade.book.entity.Book;
import com.d209.childmade.book.repository.BookRepository;
import com.d209.childmade.role.entity.Role;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public Page<Book> findBookList(Pageable pageable) {
        Page<Book> page = bookRepository.findAll(pageable);
        if(page.isEmpty()){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_BOOK_LIST);
        }
        return page;
    }

    public RoleListResponseDto findRoleListByBook(int bookId) {
        Optional<Book> book = bookRepository.findById(bookId);
        if(book.isEmpty()){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_BOOK);
        }
        List<Role> roleList = book.get().getRoles();
        if(roleList.isEmpty()){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_ROLE);
        }
        List<RoleListDto> roleListDtoList = roleList.stream().map(RoleListDto::new).toList();
        return RoleListResponseDto.of(book.get().getTitle(), book.get().getSummary(),book.get().getImageUrl(), roleListDtoList);
    }
}
