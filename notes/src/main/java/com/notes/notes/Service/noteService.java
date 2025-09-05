package com.notes.notes.Service;

import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.notes.notes.Dto.NoteViewResponseDto;
import com.notes.notes.Dto.NotesCreateDto;
import com.notes.notes.Dto.NotesResponseDto;
import com.notes.notes.Dto.NotesUpdateDto;
import com.notes.notes.Helper.hashHelper;
import com.notes.notes.Pojo.Notes;
import com.notes.notes.Pojo.ShareNote;
import com.notes.notes.Repositry.notesrepo;
import com.notes.notes.Repositry.sharetokenrepo;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class noteService {

    private final notesrepo notesrepo;
    private final sharetokenrepo sharetokenrepo;
    private final hashHelper hashHelper;
    public noteService(
        notesrepo notesrepo,
        sharetokenrepo sharetokenrepo,
        hashHelper hashHelper
    ) {

        this.notesrepo = notesrepo;
        this.sharetokenrepo = sharetokenrepo;
        this.hashHelper = hashHelper;
    }

    private NotesResponseDto convNotesResponseDto(Notes note) {
        NotesResponseDto notesResponseDto = new NotesResponseDto(note.getUserCreatedEmail(), note.getCreatedAt(), note.getUpdatedAt(), note.getTitle(), note.getSlug(), note.getContent());
        return notesResponseDto;
    }

    @Transactional
    public NotesResponseDto createNote(String user, NotesCreateDto notesdto ) {
        Notes note = notesrepo.findByUserCreatedEmailAndSlug(user, notesdto.getSlug());
        if(note != null) {
            throw new RuntimeException("Notes Alrady Exisit");
        }

        note = new Notes();
        note.setUserCreatedEmail(user);
        note.setCreatedAt(LocalDateTime.now());
        note.setUpdatedAt(LocalDateTime.now());
        note.setTitle(notesdto.getTitle());
        note.setSlug(notesdto.getSlug());
        note.setContent(notesdto.getContent());
        note.setNotes_id(UUID.randomUUID().toString());

        notesrepo.save(note);

        return convNotesResponseDto(note);

    }

    public NotesResponseDto getNote(String id) {
        Optional<Notes> optional =  notesrepo.findById(id);
        if(!optional.isPresent()) throw new RuntimeException("Not Found");

        return convNotesResponseDto(optional.get());

    } 

    public List<NotesResponseDto> getNotesforUser(String user) {
        
        List<NotesResponseDto> getNotes = notesrepo.findByUserCreatedEmail(user).stream()
                                                    .map(note -> convNotesResponseDto(note)).collect(Collectors.toList());
        return getNotes;      
    } 

    public NotesResponseDto getNoteSlug(String slug, String user) {
        Notes optional =  notesrepo.findByUserCreatedEmailAndSlug(user, slug);
        if(optional == null) throw new RuntimeException("Not Found");

        return convNotesResponseDto(optional);

    }

    @Transactional
    public void deleteNoteBySlug(String slug, String user) {
        log.info(slug );
        Notes note =  notesrepo.findByUserCreatedEmailAndSlug(user, slug);
        if(note == null) {
            throw new RuntimeException("Not Found");
        }
        ShareNote shareNote = sharetokenrepo.findBySlug(slug);
        if(shareNote != null) {
            sharetokenrepo.delete(shareNote);
        }
        notesrepo.delete(note);
    }

    @Transactional
    public NotesResponseDto updateNote(String user, String slug , NotesUpdateDto notesUpdateDto) {
        Notes note =  notesrepo.findByUserCreatedEmailAndSlug(user, slug);
        if(note == null) {
            throw new RuntimeException("Not Found");
        }
        if(notesUpdateDto.getTitle() != null) note.setTitle(notesUpdateDto.getTitle());
        if(notesUpdateDto.getSlug() != null) note.setSlug(notesUpdateDto.getSlug());
        if(notesUpdateDto.getContent() != null) note.setContent(notesUpdateDto.getContent());
        note.setUpdatedAt(LocalDateTime.now());

        notesrepo.save(note);

        return convNotesResponseDto(note);


    }

    @Transactional
    public Map<String,String> createShare(String slug,String user) {
        Map<String,String> response = new HashMap<>();
        Notes note =  notesrepo.findByUserCreatedEmailAndSlug(user, slug);
        if(note == null) {
            throw new RuntimeException("Not Found");
        }

        ShareNote shareNote = sharetokenrepo.findBySlug(slug);
        if(shareNote != null) {
            response.put("Sharetoken",shareNote.getShareToken());
            response.put("message","Already Exist");

            return response;
        }

        shareNote = new ShareNote();

        try {
            String sharetoken  = hashHelper.token_hash(slug);
            shareNote.setShareToken(sharetoken);
            shareNote.setSlug(slug);
            shareNote.setUserCreatedEmail(user);

            sharetokenrepo.save(shareNote);

            response.put("Sharetoken",shareNote.getShareToken());
            response.put("message"," Created Token");

        } catch (NoSuchAlgorithmException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return response;

    }

    public NoteViewResponseDto getViewResponse(String token) {
        ShareNote shareNote = sharetokenrepo.findByShareToken(token);
        if(shareNote == null) {
            throw new RuntimeException("Token is Invalid");
        }
        Notes note =  notesrepo.findByUserCreatedEmailAndSlug(shareNote.getUserCreatedEmail(), shareNote.getSlug());
        if(note == null) {
            throw new RuntimeException("Not Found");
        }

        NoteViewResponseDto noteViewResponseDto = new NoteViewResponseDto(note.getUserCreatedEmail(), note.getTitle(), note.getSlug(), note.getContent());

        return noteViewResponseDto;


    }
}
