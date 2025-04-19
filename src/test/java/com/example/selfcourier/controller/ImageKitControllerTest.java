package com.example.selfcourier.controller;

import com.example.selfcourier.service.ImageKitService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import org.springframework.test.web.servlet.MockMvc;

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


import java.util.HashMap;
import java.util.Map;

import static org.mockito.Mockito.mock;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ImageKitControllerTest.class)
@Import(ImageKitControllerTest.TestConfig.class)
class ImageKitControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ImageKitService imageKitService;

    @Test
     void testGetImageKitAuth() throws Exception{
        Map<String, String> testAuth = new HashMap<>();
        testAuth.put("token", "test-token");
        testAuth.put("signature", "test-signature");
        testAuth.put("expire", "12345");
        testAuth.put("publicKey", "test-public-key");

        Mockito.when(imageKitService.generateAuth()).thenReturn(testAuth);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/imagekit/auth").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("test-token"))
                .andExpect(jsonPath("$.expire").value("12345"))
                .andExpect(jsonPath("$.signature").value("test-signature"))
                .andExpect(jsonPath("$.publicKey").value("test-public-key"));
    }

    @Configuration
    static class TestConfig{
        @Bean
        public ImageKitService imageKitService(){
            return mock(ImageKitService.class);
        }
    }
}
