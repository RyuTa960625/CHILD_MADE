package com.d209.childmade.room.entity;

import com.d209.childmade._common.entity.BaseTime;
import com.d209.childmade.member.entity.Member;
import com.d209.childmade.role.entity.Role;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberRoom extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_room_id")
    private Long id;

    @Column(nullable = false)
    private boolean isBoss;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @Builder
    private MemberRoom(boolean isBoss, Member member, Room room, Role role) {
        this.isBoss = isBoss;
        this.member = member;
        this.room = room;
        this.role = role;
    }

    public static MemberRoom of(boolean isBoss, Member member, Room room, Role role) {
        return builder()
                .isBoss(isBoss)
                .member(member)
                .room(room)
                .role(role)
                .build();
    }
}
