package com.notes.notes.Service;

import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import com.notes.notes.Pojo.jwtToken;
import com.notes.notes.Repositry.tokenRepo;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class jwtService {
    
    private SecretKey secretKey;
    private final tokenRepo tokenRepo;

    public jwtService(tokenRepo tokenRepo 
                        
   
   ) {
    this.tokenRepo = tokenRepo;
    SecretKey_Genrate();
   }

   private  void  SecretKey_Genrate() {
        KeyGenerator keyGenerator;
        try {
            keyGenerator = KeyGenerator.getInstance("HmacSHA256");
            secretKey  =  keyGenerator.generateKey();
        } catch (NoSuchAlgorithmException e) {
            // TODO Auto-generated catch block
            // hey  thos is  the  dev  Erroe  yu  hvae  to  handle  thos  
            e.printStackTrace();
        }
       
    }

    public String genrate_token(Map<String, Object> claims, String subject) {

        String jit = UUID.randomUUID().toString();
        String Jwt_token =  Jwts.builder()
                                    .id(jit)
                                    .claims(claims)
                                    .subject(subject)
                                    .issuedAt(new Date(System.currentTimeMillis()))
                                    .expiration(new Date(System.currentTimeMillis() + (24000*3600)) ) 
                                    .signWith(secretKey)
                                    .compact();

        // save in tehe repo 
        jwtToken token = new jwtToken();
        token.setJti(jit);
        token.setAppUser(subject);
       

        tokenRepo.save(token);
                                    // 10 hours
        return Jwt_token;

    }

    public boolean validate_token(String token , String subject) {
        // i need to. call in the repo 
        final  Claims  claims  =  Jwts
                                    .parser()
                                    .verifyWith(secretKey)
                                    .build()
                                    .parseSignedClaims(token)
                                    .getPayload();
        String tokenSubject = claims.getSubject();
        String jti = claims.getId();
        boolean istime_expire = claims.getExpiration().before(new  Date());
        log.info("jit {} user {} istime {}",jti,tokenSubject,istime_expire);
        jwtToken jwtToken = tokenRepo.findByJti(jti);
        if(jwtToken == null) return false;
        log.info(jwtToken.toString());

        log.info(""+jwtToken.getAppUser().equals(tokenSubject) );
        log.info("jti " +tokenSubject.equals(subject) + " " + subject);

        boolean isValid = !istime_expire &&  jwtToken.getAppUser().equals(tokenSubject)&& tokenSubject.equals(subject) ;

        return isValid;
    }

    public boolean invalidate_token(String userid ) {
    
        jwtToken tokenEntity = tokenRepo.findByAppUser(userid);
        if (tokenEntity != null) {
            tokenRepo.delete(tokenEntity);
            return true;    
        }
        return false;
    }

    public String getSubjectFromToken(String token) {
        final Claims claims = Jwts
                                .parser()
                                .verifyWith(secretKey)
                                .build()
                                .parseSignedClaims(token)
                                .getPayload();
        return claims.getSubject();
    }
}

