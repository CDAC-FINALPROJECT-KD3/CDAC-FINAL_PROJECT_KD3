package com.hotelbooking.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.hotelbooking.entity.Booking;
import com.hotelbooking.entity.Room;
import com.hotelbooking.entity.User;

import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookingDTO {
	
	private Long id;
	
	private LocalDate checkInDate;
	
	private LocalDate checkOutDate;
	
	
	private int numberOfAdults;
	
	private int numberOfChildern;
	
	private int totalNumberOfGuest;
	
	private String bookingConfigurationCode;

	private UserDTO user;
	

	private RoomDTO room;

}
