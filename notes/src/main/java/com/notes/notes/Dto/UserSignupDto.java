package com.notes.notes.Dto;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
public class UserSignupDto {

    private String username;
    private String password;
    private String email;

    
}
