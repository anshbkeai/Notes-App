package com.notes.notes.Pojo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class ShareNote {

    @Id
    private String shareToken;
    private String slug;
    private String userCreatedEmail;

}
