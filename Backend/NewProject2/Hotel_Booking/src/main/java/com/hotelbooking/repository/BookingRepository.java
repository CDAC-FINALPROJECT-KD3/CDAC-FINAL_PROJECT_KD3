package com.hotelbooking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotelbooking.model.BookedRoom;

public interface BookingRepository extends JpaRepository<BookedRoom,Long> {
	List<BookedRoom> findByRoomId(Long roomId);
	
	Optional<BookedRoom> findByBookingConfiormationCode(String conformationCode);
	
	List<BookedRoom> findByGuestEmail(String email);
	

}
