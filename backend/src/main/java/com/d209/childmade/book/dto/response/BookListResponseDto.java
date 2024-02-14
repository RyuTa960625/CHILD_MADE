package com.d209.childmade.book.dto.response;

import com.d209.childmade.book.entity.Book;
import lombok.Builder;
import lombok.Getter;

@Getter
public class BookListResponseDto {

    private final Integer id;
    private final String title;
    private final String imageUrl;
    private final int maxNum;

    @Builder
    private BookListResponseDto(Book book) {
        this.id = book.getId();
        this.title = book.getTitle();
        this.imageUrl = book.getImageUrl();
        this.maxNum = book.getMaxNum();
    }

    public static BookListResponseDto of(Book book){
        return builder()
                .book(book)
                .build();
    }
}
