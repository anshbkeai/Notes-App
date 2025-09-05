package com.notes.notes.Filter;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.notes.notes.Pojo.AppUser;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class jwtFilter extends OncePerRequestFilter  {
    
    private com.notes.notes.Service.jwtService jwtService;
    private com.notes.notes.Service.userDetailsServie userDetailsServie;

    public jwtFilter(com.notes.notes.Service.jwtService jwtService , com.notes.notes.Service.userDetailsServie userDetailsServie) {
        this.jwtService = jwtService;
        this.userDetailsServie = userDetailsServie;
    }
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
         String request_uri = request.getRequestURI();
        // Skip JWT validation only for login and signup endpoints, not logout
        if(request_uri.contains("/auth/login") || request_uri.contains("/auth/signup") || request_uri.contains("/auth")  ) {
            filterChain.doFilter(request, response);
            return;
        }
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && !authHeader.isEmpty() && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7);
            String subject = jwtService.getSubjectFromToken(jwt);
            if(subject != null && !subject.isEmpty() && SecurityContextHolder.getContext().getAuthentication() == null) {
                AppUser user= (AppUser) userDetailsServie.loadUserByUsername(subject);
                if(user != null) {
                    if(jwtService.validate_token(jwt, user.getEmail())) {
                        UsernamePasswordAuthenticationToken  token2 =  new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());
                     token2.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(token2);

                        log.info("JWT Token is valid for user: {}", user.getEmail());
                    }
                    
                }

            }
        } else {
            // No Authorization header - let Spring Security handle it
            log.debug("No Authorization header found for request: {}", request_uri);
        }
        
        filterChain.doFilter(request, response);
        
    }

}
