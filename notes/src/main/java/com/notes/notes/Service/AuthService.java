package com.notes.notes.Service;


import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.notes.notes.Dto.UserLoginDto;
import com.notes.notes.Dto.UserSignupDto;
import com.notes.notes.Pojo.AppUser;
import com.notes.notes.Repositry.appUserrepo;



@Service
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final userDetailsServie userDetailsService;
    private final appUserrepo userRepo;
    private AuthenticationManager authenticationManager;
    private final jwtService jwtService;

    public AuthService(PasswordEncoder passwordEncoder, userDetailsServie userDetailsService, appUserrepo userRepo , 
            AuthenticationManager authenticationManager,
            jwtService jwtService
    ) {
        this.passwordEncoder = passwordEncoder;
        this.userDetailsService = userDetailsService;
        this.userRepo = userRepo;
        
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public Map<String, String> processSignup(UserSignupDto userSignupDto) {
        // Hash the password
        Map<String, String> response = new HashMap<>();
        String hashedPassword = passwordEncoder.encode(userSignupDto.getPassword());
         AppUser newUser = new AppUser();
       
        if(userRepo.findByEmail(userSignupDto.getEmail()) != null) {
            response.put("message", "User Already Exists");
            return response;
        }
       
        newUser.setEmail(userSignupDto.getEmail());
        newUser.setPassword(hashedPassword);
        newUser.setName(userSignupDto.getUsername());


        // Save the user to the database
        userRepo.save(newUser);
         
        response.put("message", "Signup Successfull");
        return response;
        
        


    }

    public Map<String, String> processLogin(UserLoginDto userLoginDto) {
         Map<String, String> response = new HashMap<>();
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(userLoginDto.getEmail(), userLoginDto.getPassword())
        );
        if(!authentication.isAuthenticated()) {
            response.put("message", "Invalid credentials");
            response.put("token", "");
            return response;
        } else {
            AppUser user = (AppUser) authentication.getPrincipal();
            String token = jwtService.genrate_token(Map.of("isEnable", user.isEnabled()), user.getEmail());
            response.put("token", token);
            response.put("message", "Login successful");
            return response;
        }

    }

    public Map<String, String> processLogout(String user_id) {
        Map<String, String> response = new HashMap<>();
        if (jwtService.invalidate_token(user_id)) {
            response.put("message", "Logout successful");
        } else {
            response.put("message", "Invalid token");
        }
        return response;
    }

    
}

