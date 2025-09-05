package com.notes.notes.Repositry;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.notes.notes.Pojo.AppUser;
import java.util.List;


@Repository
public interface appUserrepo extends MongoRepository<AppUser, String> {

    AppUser  findByEmail(String email);
}
