package com.notes.notes.Dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class NotesCreateDto {

    
    private String title;
    private String slug; // this will be uniuw about help to fetvh about the that and can handle that in that env 
    private String content;
}
