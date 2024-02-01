package com.d209.childmade.room.repository;

import com.d209.childmade.room.entity.Room;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("SELECT r FROM Room r " +
            "WHERE r.book.id = :bookId " +
            "AND r.roomStatus = com.d209.childmade.room.entity.RoomStatus.WAITING " +
            "AND NOT EXISTS (SELECT 1 FROM MemberRoom mr WHERE mr.room.id = r.id AND mr.role.id = :roleId) " +
            "ORDER BY r.createdAt ASC")
    List<Room> findByBookIdAndRoomStatusAndNotRoleIdOrderByCreatedAtAsc(int bookId, int roleId, Pageable pageable);

}
