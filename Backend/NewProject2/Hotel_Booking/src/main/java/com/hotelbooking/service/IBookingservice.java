package com.hotelbooking.service;

import java.util.List;

import com.hotelbooking.exception.ResourceNotFoundException;
import com.hotelbooking.model.BookedRoom;

public interface IBookingservice {
	void cancelBooking(Long bokingId);
	
	List<BookedRoom> getAllBookingByRoomId(Long roomId);
	
	String saveBooking(Long roomId, BookedRoom bookingRequest);
	
	BookedRoom findByBookingConfirmationCode(String confirmationCode) throws ResourceNotFoundException;
	
	List<BookedRoom> getAllBooking();
	
	List<BookedRoom> getBookingsByUserEmail(String email);

}
