package com.d209.childmade.book.entity;

import com.d209.childmade.role.entity.Role;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Script {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_room_id")
    private Long id;

    @Column(nullable = false)
    private int scriptNum;

    @Column(nullable = false)
    private String scriptLine;

    @Column(nullable = false)
    private String videoUrl;

    @Column(nullable = false)
    private int branchNum;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Builder
    private Script(int scriptNum, String scriptLine, String videoUrl, int branchNum, Role role, Book book) {
        this.scriptNum = scriptNum;
        this.scriptLine = scriptLine;
        this.videoUrl = videoUrl;
        this.branchNum = branchNum;
        this.role = role;
        this.book = book;
    }

    public static Script of(int scriptNum, String scriptLine, String videoUrl, int branchNum, Role role, Book book) {
        return builder()
                .scriptNum(scriptNum)
                .scriptLine(scriptLine)
                .videoUrl(videoUrl)
                .branchNum(branchNum)
                .role(role)
                .book(book)
                .build();
    }
}
