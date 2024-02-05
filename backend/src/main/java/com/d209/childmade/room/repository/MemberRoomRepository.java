package com.d209.childmade.room.repository;

import com.d209.childmade.room.entity.MemberRoom;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberRoomRepository extends JpaRepository<MemberRoom, Long> {

    Optional<MemberRoom> findByMemberIdAndRoomId(Integer memberId,Long roomId);
//    List<MemberRoom> findAllByRoomIdAndMemberRoomIdNot(long roomId, long memberRoomId, Pageable pageable);
    @Query("SELECT mr FROM MemberRoom mr WHERE mr.room.id = :roomId AND mr.id <> :memberRoomId")
    Page<MemberRoom> findMemberRoomsByRoomIdAndNotMemberRoomId(Long roomId, Long memberRoomId, Pageable pageable);
}
