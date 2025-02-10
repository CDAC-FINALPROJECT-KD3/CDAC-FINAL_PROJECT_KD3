package com.hotelbooking.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hotelbooking.exception.InvalidBookingRequestException;
import com.hotelbooking.exception.ResourceNotFoundException;
import com.hotelbooking.model.BookedRoom;
import com.hotelbooking.model.Room;
import com.hotelbooking.repository.BookingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingService implements IBookingservice {
	
	private final BookingRepository bookingRepository;
	private final IRoomService roomService;

	@Override
	public void cancelBooking(Long bokingId) {
		bookingRepository.deleteById(bokingId);
	}

	@Override
	public List<BookedRoom> getAllBookingByRoomId(Long roomId) {
		return bookingRepository.findByRoomId(roomId);
	}

	@Override
	public String saveBooking(Long roomId, BookedRoom bookingRequest) {
		if(bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
			throw new InvalidBookingRequestException("Check-in date must come before check-out-date");
		}
		Room room = roomService.getRoomById(roomId).get();
		List<BookedRoom> existingBookings = room.getBookings();
		Boolean roomIsAvailable = roomIsAvailable(bookingRequest,existingBookings);
		if(roomIsAvailable) {
			room.addBooking(bookingRequest);
			bookingRepository.save(bookingRequest);
		}
		else {
			throw new InvalidBookingRequestException("Sorry, This room is not available for the selected dates");
		}
		return bookingRequest.getBookingConfirmationCode();
		
		
	}

	@Override
	public BookedRoom findByBookingConfirmationCode(String confirmationCode) throws ResourceNotFoundException {
		
		return bookingRepository.findByBookingConfiormationCode(confirmationCode).orElseThrow(()-> new ResourceNotFoundException("No booking found with booking code: " + confirmationCode));
	}

	@Override
	public List<BookedRoom> getAllBooking() {
		return bookingRepository.findAll();
	}

	@Override
	public List<BookedRoom> getBookingsByUserEmail(String email) {
		return bookingRepository.findByGuestEmail(email);
	}
	
	
	private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
	    return existingBookings.stream().noneMatch(existingBooking ->
	        bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()) &&
	        bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckInDate())
	    );
	}




}
