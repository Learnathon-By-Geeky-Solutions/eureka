package com.example.selfcourier.config;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "imagekit")
@Getter
//@Setter
@NoArgsConstructor
public class ImageKitAuthConfig {
    // ==============   Getter and Setter ====================== //
    private String publicKey;
    private String privateKey;
    private String urlEndpoint;
}
