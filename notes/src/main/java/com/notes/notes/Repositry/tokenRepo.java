package com.notes.notes.Repositry;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.notes.notes.Pojo.jwtToken;
import java.util.List;


@Repository
public interface tokenRepo extends MongoRepository<jwtToken,String> {

   jwtToken findByJti(String jti);

    jwtToken  findByAppUser(String appUser);
}
