package com.notes.notes.Service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.notes.notes.Pojo.AppUser;
import com.notes.notes.Repositry.appUserrepo;

@Service
public class userDetailsServie implements UserDetailsService {

     private final appUserrepo userrepo;
    public userDetailsServie(appUserrepo userrepo) {
        this.userrepo = userrepo;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       
        AppUser appUser = userrepo.findByEmail(username);

// Exceprtion Must be thrown 
        if (appUser == null) {
            throw new UsernameNotFoundException("User not found with email: " + username);
        }
        return appUser;
    }

}
