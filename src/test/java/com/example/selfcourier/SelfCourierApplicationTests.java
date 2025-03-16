package com.example.selfcourier;

import com.example.selfcourier.config.JwtService;
import com.example.selfcourier.entity.Users;
import com.example.selfcourier.error.DefaultException;
import com.example.selfcourier.model.Role;
import com.example.selfcourier.model.UserProfileResponse;
import com.example.selfcourier.repository.AuthRepository;
import com.example.selfcourier.service.AuthService;
import com.example.selfcourier.service.AuthServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;


@SpringBootTest
class SelfCourierApplicationTests {
    @Mock
    private AuthRepository authRepository;
    @InjectMocks
    private AuthServiceImpl authService;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtService jwtService;
    @Mock
    private AuthenticationManager authenticationManager;

    private AutoCloseable closeable;
    @Test
    void contextLoads() {
    }
    @BeforeEach
    void setup(){
        closeable = MockitoAnnotations.openMocks(this);

    }
    @AfterEach
    void tearDown() throws Exception{
        closeable.close();
    }

    @Test
    void testGetUserProfileByEmail_UserExists(){
        // new user for test
        Users user = new Users();
        user.setName("user 10");
        user.setEmail("user10@example.com");
        user.setPhone("01700931441");
        user.setAddress("Dhaka, Mirpur");
        user.setUserId(3L); // 3 -> int, 3L -> long
        user.setRole(Role.USER);  // Role is a Role objects

        when(authRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        // Execute check
        UserProfileResponse response = authService.getUserProfile(user.getEmail());

        // verify
        assertEquals("user 10", response.getName());
        assertEquals("user10@example.com", response.getEmail());
        assertEquals("01700931441", response.getPhone());
        assertEquals("Dhaka, Mirpur", response.getAddress());
        assertEquals(3L, response.getUserId());
        assertEquals("USER", response.getRole());

    }
    @Test
    void testGetUserProfileByEmail_NotFound(){
        when(authRepository.findByEmail("Unkown@sample.com")).thenReturn(Optional.empty());

        DefaultException exception = assertThrows(DefaultException.class, ()-> authService.getUserProfile("Unkown@sample.com"));
        assertEquals("User not founded", exception.getMessage());
    }

}
