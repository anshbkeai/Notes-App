package com.notes.notes.Service;

import org.springframework.stereotype.Service;

import com.notes.notes.Dto.UserResponseDto;
import com.notes.notes.Pojo.AppUser;
import com.notes.notes.Repositry.appUserrepo;

@Service
public class userService {

    private final appUserrepo appUserrepo;

    public userService(appUserrepo appUserrepo) {
        this.appUserrepo = appUserrepo;
    }

    public UserResponseDto getUser(String user) {
        AppUser appUser = appUserrepo.findByEmail(user);
        System.err.println(appUser.toString());
        return new UserResponseDto(appUser.getEmail(), appUser.getName());
    }

}
