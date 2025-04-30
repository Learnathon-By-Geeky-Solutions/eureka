package com.example.selfcourier.service;

import com.example.selfcourier.config.ImageKitAuthConfig;
import org.junit.jupiter.api.Test;
import static  org.junit.jupiter.api.Assertions.*;
import java.util.Map;

 class ImageKitServiceTest {

    // unit test image kit service :
    @Test
     void testGenerateAuth(){
        ImageKitAuthConfig  mockConfig = new ImageKitAuthConfig();

      
        setField(mockConfig, "publicKey", "test_public_key");
        setField(mockConfig, "privateKey", "test_private_key");
        setField(mockConfig, "urlEndpoint", "http://ik.imagekit.io/test");
//        ImageKitService
        ImageKitServiceImpl service = new ImageKitServiceImpl(mockConfig);
        Map<String, String> auth = service.generateAuth();

        assertNotNull(auth.get("token"));
        assertNotNull(auth.get("expire"));
        assertNotNull(auth.get("signature"));
        assertEquals("test_public_key", auth.get("publicKey"));

    }

    private void setField(Object obj, String field, String value){
        try{
            var fieldValue = obj.getClass().getDeclaredField(field);
            fieldValue.setAccessible(true);
            fieldValue.set(obj, value);
        }catch (Exception e){
            throw new RuntimeException("Test : image kit services, setField error - ",e);
        }
    }
}
