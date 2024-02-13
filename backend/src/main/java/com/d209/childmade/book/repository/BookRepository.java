package com.d209.childmade.book.repository;

import com.d209.childmade.book.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookRepository extends JpaRepository<Book, Integer> {

    @Query("SELECT b FROM Book b WHERE b.title LIKE %:title%")
    Page<Book> findAllByTitle(Pageable pageable, String title);
}
