package com.example.selfcourier;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SelfCourierApplication {

    public static void main(String[] args) {

        Dotenv dotenv = Dotenv.load();
        System.setProperty("SPRING_PROFILES_ACTIVE", dotenv.get("SPRING_PROFILES_ACTIVE"));
        System.setProperty("DB_URL", dotenv.get("DB_URL"));
        System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
        System.setProperty("CORS_ALLOWED_ORIGINS", dotenv.get("CORS_ALLOWED_ORIGINS"));
        System.setProperty("imageKit_PUBLIC_KEY", dotenv.get("imageKit_PUBLIC_KEY"));
        System.setProperty("imageKit_PRIVATE_KEY", dotenv.get("imageKit_PRIVATE_KEY"));
        System.setProperty("imageKit_URL_ENDPOINT", dotenv.get("imageKit_URL_ENDPOINT"));
        System.setProperty("tokenImageKitAuthUUID", dotenv.get("tokenImageKitAuthUUID"));
        SpringApplication.run(SelfCourierApplication.class, args);
    }

}
