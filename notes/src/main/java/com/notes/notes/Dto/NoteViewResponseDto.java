package com.notes.notes.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoteViewResponseDto {

    private String userCreatedEmail; 
     private String title;
    private String slug; // this will be uniuw about help to fetvh about the that and can handle that in that env 
    private String content;
}
