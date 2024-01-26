package com.d209.childmade.book.entity;

import com.d209.childmade._common.entity.BaseTime;
import com.d209.childmade.role.entity.Role;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Book extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Integer id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String summary;

    @Column(nullable = false)
    private int maxNum;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<Role> roles = new ArrayList<>();

    @Builder
    private Book(String title, String imageUrl, String summary, int maxNum, List<Role> roles) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.summary = summary;
        this.maxNum = maxNum;
        this.roles = roles;
    }

    public static Book of(String title, String imageUrl, String summary, int maxNum, List<Role> roles) {
        return builder()
                .title(title)
                .imageUrl(imageUrl)
                .summary(summary)
                .maxNum(maxNum)
                .roles(roles)
                .build();
    }

}
