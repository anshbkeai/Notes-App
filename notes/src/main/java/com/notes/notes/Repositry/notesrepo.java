package com.notes.notes.Repositry;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.notes.notes.Pojo.Notes;
import java.util.List;


@Repository
public interface notesrepo  extends MongoRepository<Notes,String>{


    Notes findByUserCreatedEmailAndSlug(String userCreatedEmail, String slug);

    List<Notes> findByUserCreatedEmail(String userCreatedEmail);

    Notes findBySlug(String slug);

}
