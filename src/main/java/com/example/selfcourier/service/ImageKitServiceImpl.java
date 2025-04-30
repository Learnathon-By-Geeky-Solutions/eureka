package com.example.selfcourier.service;

import com.example.selfcourier.config.ImageKitAuthConfig;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class ImageKitServiceImpl implements ImageKitService{
    private final ImageKitAuthConfig config;

    public ImageKitServiceImpl(ImageKitAuthConfig config){
        this.config = config;
    }
    @Override
    public Map<String, String> generateAuth(){
        long timestamp = System.currentTimeMillis() / 1000; // Note: usually timestamp should be in seconds for auth
        String token = UUID.randomUUID().toString();
        String expire = String.valueOf(timestamp+60*2);
        String signature = generateSignature(config.getPrivateKey(), token+expire);

        Map<String, String> authParams = new HashMap<>();
        System.out.println("-------------> config : "+ config.getPublicKey()+ " private key "+ config.getPrivateKey());

        authParams.put("token", token);
        System.out.println("token name:  "+ token);

        authParams.put("expire", expire); // 5 min expired
        authParams.put("signature", signature);
        authParams.put("publicKey", config.getPublicKey());

        return authParams;
    }

    private String generateSignature(String privateKey, String dataToSign) {
        try {
            Mac sha1Mac = Mac.getInstance("HmacSHA1");
            SecretKeySpec secretKey = new SecretKeySpec(privateKey.getBytes(StandardCharsets.UTF_8), "HmacSHA1");
            sha1Mac.init(secretKey);
            byte[] hmacData = sha1Mac.doFinal(dataToSign.getBytes(StandardCharsets.UTF_8));

            // Convert bytes to HEX string (not Base64)
            StringBuilder hexString = new StringBuilder();
            for (byte b : hmacData) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }

            return hexString.toString().toLowerCase(); // Very important: lower case
        } catch (Exception e) {
            throw new RuntimeException("Error generating signature for ImageKit", e);
        }
    }

}
