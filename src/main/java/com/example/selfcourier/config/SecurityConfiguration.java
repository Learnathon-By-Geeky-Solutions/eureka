package com.example.selfcourier.config;


import lombok.RequiredArgsConstructor;

import lombok.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;



import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private final AuthenticationProvider authenticationProvider;
    private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors(cors-> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests((requests) -> requests.requestMatchers
                                (
                                        "/api/v1/auth/register",
                                        "/api/v1/auth/login",
                                        "/api/v1/welcome",
                                        "/api/v1/imagekit/auth"
                                ).permitAll()
                        .requestMatchers("/api/v1/admin/**").hasAuthority("ADMIN")
                        .requestMatchers("/api/v1/worker/**").hasAuthority("WORKER")
                        .requestMatchers("/api/v1/auth/profile/**").authenticated()
                        .anyRequest()
                        .authenticated())
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                 .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling( (exception) -> exception
                        .authenticationEntryPoint(userAuthenticationEntryPoint));
        return httpSecurity.build();
    }
    String allowOrigin = System.getenv("CORS_ALLOWED_ORIGINS");
    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(Arrays.asList(allowOrigin.split(",")));// fontend host port id
//        config.addAllowedOriginPattern("http://192.168.*.*:*");
//        config.allowedOrigins("http://10.0.2.2:8080")
        config.setAllowedMethods(List.of("POST", "PUT", "PATCH", "GET", "OPTIONS", "DELETE"));
        config.setAllowedHeaders(List.of("Authorization", "Accept", "X-Requested-With", "Content-Type"));
        config.setExposedHeaders(List.of("Authorization"));
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}

