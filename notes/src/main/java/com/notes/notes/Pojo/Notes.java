package com.notes.notes.Pojo;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notes {

    @Id
    private String notes_id;
    private String userCreatedEmail;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    
    private String title;
    private String slug; // this will be uniuw about help to fetvh about the that and can handle that in that env 
    private String content;


}

