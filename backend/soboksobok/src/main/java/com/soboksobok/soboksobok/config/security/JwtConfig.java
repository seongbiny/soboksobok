package com.soboksobok.soboksobok.config.security;

import com.soboksobok.soboksobok.oauth.token.AuthTokenProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {
    @Value("${jwt.secret}")
    private String secret;

    @Bean
    public AuthTokenProvider jwtProvider() {
        System.out.println("JwtConfig - jwtProvider");
        return new AuthTokenProvider(secret);
    }
}
