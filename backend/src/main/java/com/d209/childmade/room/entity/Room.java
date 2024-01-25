package com.d209.childmade.room.entity;

import com.d209.childmade._common.entity.BaseTime;
import com.d209.childmade.book.entity.Book;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Room extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id;

    @Column(nullable = false)
    private int curNum;

    @Column(nullable = false)
    private RoomStatus roomStatus;

    @Column(nullable = false)
    private String roomSessionName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Builder
    private Room(int curNum, RoomStatus roomStatus, String roomSessionName, Book book) {
        this.curNum = curNum;
        this.roomStatus = roomStatus;
        this.roomSessionName = roomSessionName;
        this.book = book;
    }

    public static Room of(int curNum, RoomStatus roomStatus, String roomSessionName, Book book) {
        return builder()
                .curNum(curNum)
                .roomStatus(roomStatus)
                .roomSessionName(roomSessionName)
                .book(book)
                .build();
    }
}
