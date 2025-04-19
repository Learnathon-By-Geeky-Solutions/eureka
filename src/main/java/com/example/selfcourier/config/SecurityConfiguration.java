package com.example.selfcourier.config;


import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;


import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


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
//                .csrf(csrf -> csrf
//                        .ignoringRequestMatchers(
//                                new AntPathRequestMatcher("/api/v1/auth/register"),
//                                new AntPathRequestMatcher("/api/v1/auth/login"),
//                                new AntPathRequestMatcher("/api/v1/auth/welcome"),
//                                new AntPathRequestMatcher("/api/v1/imagekit/auth")
//
//                        )
//                        .disable().authorizeHttpRequests()
//                )
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

    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(List.of("http://localhost:5173", "http://192.168.0.103:8081, http://10.0.2.2:8080"));// fontend host port id
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

