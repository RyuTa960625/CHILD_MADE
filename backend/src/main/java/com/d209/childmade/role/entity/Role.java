package com.d209.childmade.role.entity;

import com.d209.childmade.book.entity.Book;
import jakarta.persistence.*;
import java.util.Arrays;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Integer id;

    @Column(nullable = false)
    private String roleName;

    @Column(nullable = false)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    private List<Helper> helpers = new ArrayList<>();

    @Builder
    private Role(String roleName, String imageUrl, Book book) {
        this.roleName = roleName;
        this.imageUrl = imageUrl;
        this.book = book;
    }

    public static Role of(String roleName, String imageUrl, Book book) {
        return builder()
                .roleName(roleName)
                .imageUrl(imageUrl)
                .book(book)
                .build();
    }

    public void addHelper(Helper... helper){
        this.helpers.addAll(Arrays.asList(helper));
    }
}
