package com.example.selfcourier.config;


import lombok.*;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "imagekit")

@NoArgsConstructor
@Data
@Builder
@AllArgsConstructor
public class ImageKitAuthConfig {
    // ==============   Getter and Setter ====================== //
    private String publicKey;
    private String privateKey;
    private String urlEndpoint;
}
