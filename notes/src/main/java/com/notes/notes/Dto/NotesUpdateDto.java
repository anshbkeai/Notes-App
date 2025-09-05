package com.notes.notes.Dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
public class NotesUpdateDto {

    @JsonInclude(JsonInclude.Include.NON_NULL)
     private String title;
     @JsonInclude(JsonInclude.Include.NON_NULL)
    private String slug; // this will be uniuw about help to fetvh about the that and can handle that in that env 
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String content;
}
