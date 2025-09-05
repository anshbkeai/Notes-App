package com.notes.notes.Repositry;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.notes.notes.Pojo.ShareNote;
import java.util.List;


@Repository
public interface sharetokenrepo extends MongoRepository<ShareNote,String> {

    ShareNote findByShareToken(String shareToken);
    ShareNote findBySlug(String slug);
    List<ShareNote> findByUserCreatedEmail(String userCreatedEmail);

}
