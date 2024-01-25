package com.d209.childmade.role.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Helper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "helper_id")
    private Long id;

    @Column(nullable = false)
    private int situationNum;

    @Column(nullable = false)
    private String helperLine;

    @Column(nullable = false)
    private String motionUrl;

    @Column(nullable = false)
    private String audioUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @Builder
    private Helper(int situationNum, String helperLine, String motionUrl, String audioUrl, Role role) {
        this.situationNum = situationNum;
        this.helperLine = helperLine;
        this.motionUrl = motionUrl;
        this.audioUrl = audioUrl;
        this.role = role;
    }

    public static Helper of(int situationNum, String helperLine, String motionUrl, String audioUrl, Role role) {
        return builder()
                .situationNum(situationNum)
                .helperLine(helperLine)
                .motionUrl(motionUrl)
                .audioUrl(audioUrl)
                .role(role)
                .build();
    }
}
