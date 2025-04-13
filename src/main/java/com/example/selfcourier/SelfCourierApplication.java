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

        SpringApplication.run(SelfCourierApplication.class, args);
    }

}
