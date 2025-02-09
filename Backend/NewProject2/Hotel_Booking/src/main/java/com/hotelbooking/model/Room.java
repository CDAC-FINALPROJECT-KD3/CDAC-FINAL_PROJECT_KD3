package com.hotelbooking.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomType;
    
    private BigDecimal roomPrice;
    
    private boolean isBooked = false;
    	
    @Lob
    private byte[] photo; // Prefer byte[] over Blob for easier handling

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BookedRoom> bookings = new ArrayList<>();

    public void addBooking(BookedRoom booking) {
        if (bookings == null) {
            bookings = new ArrayList<>();
        }
        
        bookings.add(booking);
        booking.setRoom(this);
        isBooked = true;

        // Ensure BookedRoom has this method defined correctly
        String bookingCode = RandomStringUtils.randomNumeric(10);
        booking.setBookingConfirmationCode(bookingCode); 
    }
}
