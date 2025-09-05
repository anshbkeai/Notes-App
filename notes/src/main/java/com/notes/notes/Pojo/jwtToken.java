package com.notes.notes.Pojo;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document
@Data
public class jwtToken {

   private String jti;
     private String  appUser;
}
