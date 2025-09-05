package com.notes.notes.RestController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notes.notes.Dto.UserResponseDto;
import com.notes.notes.Service.userService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/user")
public class UserRestController {

    private final userService userService;

    public UserRestController(userService userService) {
        this.userService =userService;
    }

    private String get_user_details() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
    @GetMapping("/profile")
    public ResponseEntity<UserResponseDto> getUserProfile() {
        return new ResponseEntity<UserResponseDto>(userService.getUser(get_user_details()), HttpStatus.OK);
    }
    
}
