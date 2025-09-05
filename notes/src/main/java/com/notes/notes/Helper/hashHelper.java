package com.notes.notes.Helper;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.stereotype.Component;

@Component
public class hashHelper {

     public String token_hash(String slug) throws NoSuchAlgorithmException {
        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        byte[] encoded = messageDigest.digest(slug.getBytes());
        StringBuilder hexString  = new StringBuilder();
        for (byte b : encoded) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
        }
        return hexString.toString();
    }
}
