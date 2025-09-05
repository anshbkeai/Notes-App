package com.notes.notes.RestController;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notes.notes.Dto.NoteViewResponseDto;
import com.notes.notes.Dto.NotesCreateDto;
import com.notes.notes.Dto.NotesResponseDto;
import com.notes.notes.Dto.NotesUpdateDto;
import com.notes.notes.Service.noteService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/notes")
public class NotesRestController {

    private final noteService noteService;
    public NotesRestController(noteService noteService) {
        this.noteService = noteService;
    }

     private String get_user_details() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @GetMapping("/")
    public ResponseEntity<List<NotesResponseDto>> getNotesForUser() {
        List<NotesResponseDto> notes = noteService.getNotesforUser(get_user_details());
        return new ResponseEntity<List<NotesResponseDto>>(notes, HttpStatus.OK);
    }
    
    @PostMapping("/")
    public ResponseEntity<NotesResponseDto> createNote(@RequestBody NotesCreateDto createDto) {
        
        return new ResponseEntity<NotesResponseDto>(noteService.createNote(get_user_details(), createDto), HttpStatus.CREATED);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<NotesResponseDto> getBySlug(@PathVariable String slug) {
       return new ResponseEntity<NotesResponseDto>(noteService.getNoteSlug(slug, get_user_details()), HttpStatus.OK);
    }
    
    @DeleteMapping("/{slug}")
    public ResponseEntity<?> deleteNoteBySlug(@PathVariable String slug) {
        noteService.deleteNoteBySlug(slug, get_user_details());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @PutMapping("/{slug}")
    public ResponseEntity<NotesResponseDto> updateNote(@PathVariable String slug, @RequestBody NotesUpdateDto notesUpdateDto) {
        //TODO: process PUT request
        
        return new ResponseEntity<NotesResponseDto>(noteService.updateNote(get_user_details(), slug, notesUpdateDto),HttpStatus.OK);
    }

    @PostMapping("/share/{slug}")
    public ResponseEntity<Map<String,String>> createShare(@PathVariable String slug) {
        //TODO: process POST request
        
        return new ResponseEntity<Map<String,String>>(noteService.createShare(slug, get_user_details()), HttpStatus.OK);
    }

    @GetMapping("/share/{token}")
    public ResponseEntity<NoteViewResponseDto> getViewResponse(@PathVariable String token) {
        return new ResponseEntity<NoteViewResponseDto>(noteService.getViewResponse(token), HttpStatus.OK);
    }
    
    


}
