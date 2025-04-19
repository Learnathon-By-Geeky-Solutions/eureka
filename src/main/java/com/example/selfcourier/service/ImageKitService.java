package com.example.selfcourier.service;

import com.example.selfcourier.config.ImageKitAuthConfig;
import lombok.Value;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class ImageKitService {
    private final ImageKitAuthConfig config;

    public ImageKitService(ImageKitAuthConfig config){
        this.config = config;
    }

    public Map<String, String> generateAuth(){
        long timeStemp = System.currentTimeMillis(); // 1000
        String signature = generateSignature(config.getPrivateKey(), String.valueOf(timeStemp));

        Map<String, String> authParams = new HashMap<>();
        String tokenImageKitAuthUUID = System.getenv("tokenImageKitAuthUUID");
        authParams.put("token", tokenImageKitAuthUUID);
        authParams.put("expire", String.valueOf(timeStemp + 60*5)); // 5 min expired
        authParams.put("signature", signature);
        authParams.put("publicKey", config.getPublicKey());

        return authParams;
    }

    private String generateSignature(String privateKey, String timeStemp){
        try{
            Mac sha1Mac = Mac.getInstance("SHA-512");
            SecretKeySpec secretKey = new SecretKeySpec(privateKey.getBytes(), "SHA-512");
            sha1Mac.init(secretKey);
            byte[] hmacData = sha1Mac.doFinal(timeStemp.getBytes());
            return Base64.getEncoder().encodeToString(hmacData);
        }catch (Exception e){
            throw new RuntimeException("Error generate signature for image Kit, func: generateSignature", e);
        }
    }

}
