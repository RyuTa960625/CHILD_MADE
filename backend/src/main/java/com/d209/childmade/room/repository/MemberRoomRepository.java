package com.d209.childmade.room.repository;

import com.d209.childmade.room.entity.MemberRoom;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRoomRepository extends JpaRepository<MemberRoom, Long> {
}

