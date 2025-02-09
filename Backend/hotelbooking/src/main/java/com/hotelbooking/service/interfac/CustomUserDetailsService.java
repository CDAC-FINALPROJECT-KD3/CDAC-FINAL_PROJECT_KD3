package com.hotelbooking.service.interfac;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hotelbooking.exception.MyException;
import com.hotelbooking.repository.UserRepository;


@Service
public class CustomUserDetailsService implements UserDetailsService{
	
	@Autowired
	
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		return userRepository.findByEmail(username).orElseThrow(()-> new MyException("UserName/Email not Found"));
	}

}
