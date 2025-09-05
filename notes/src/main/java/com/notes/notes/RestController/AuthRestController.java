package com.notes.notes.RestController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notes.notes.Dto.NoteViewResponseDto;
import com.notes.notes.Dto.UserLoginDto;
import com.notes.notes.Dto.UserSignupDto;
import com.notes.notes.Service.AuthService;
import com.notes.notes.Service.noteService;

import lombok.extern.slf4j.Slf4j;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthRestController {

    private final AuthService authService;
    private final noteService noteService;
    public AuthRestController(AuthService authService,noteService noteService) {
        this.authService = authService;
        this.noteService = noteService;
    }
    @PostMapping("/signup")
    public ResponseEntity<Map<String,String>> signup(@RequestBody UserSignupDto userSignupDto) {
       
        log.info(userSignupDto.toString());
        Map<String, String> response = authService.processSignup(userSignupDto);
       if(response.containsKey("message") && response.get("message").equals("Signup Successfull")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> login(@RequestBody UserLoginDto userLoginDto) {
       
         Map<String, String> response = authService.processLogin(userLoginDto);
       if(response.containsKey("message") && response.get("message").equals("Login successful")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
       
    }

     @GetMapping("/share/{token}")
    public ResponseEntity<NoteViewResponseDto> getViewResponse(@PathVariable String token) {
        return new ResponseEntity<NoteViewResponseDto>(noteService.getViewResponse(token), HttpStatus.OK);
    }
    
    
    
}
