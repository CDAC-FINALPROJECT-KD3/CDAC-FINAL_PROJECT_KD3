package com.hotelbooking.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.rowset.serial.SerialException;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hotelbooking.exception.ResourceNotFoundException;
import com.hotelbooking.model.Room;
import com.hotelbooking.response.RoomResponse;
import com.hotelbooking.service.IRoomService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {
	private final IRoomService roomService;
	
	@PostMapping("/add/new-room")
	public ResponseEntity<RoomResponse> addNewRoom(@RequestParam("photo") MultipartFile photo,@RequestParam("roomType") String roomType,@RequestParam("roomPrice")BigDecimal roomPrice) throws SerialException, IOException, SQLException
	{
		Room savedRoom = roomService.addNewRoom(photo, roomType, roomPrice);
		RoomResponse response = new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(), savedRoom.getRoomPrice());
		return ResponseEntity.ok(response);
	}
} 