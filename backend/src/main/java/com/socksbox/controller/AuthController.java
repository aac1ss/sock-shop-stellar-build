
package com.socksbox.controller;

import com.socksbox.dto.LoginRequestDto;
import com.socksbox.dto.RegisterRequestDto;
import com.socksbox.dto.UserDto;
import com.socksbox.entity.User;
import com.socksbox.security.JwtTokenProvider;
import com.socksbox.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDto loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);
            
            UserDto user = userService.getUserDtoByEmail(loginRequest.getEmail());
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", jwt);
            response.put("user", user);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email or password"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequestDto registerRequest) {
        try {
            UserDto userDto = new UserDto();
            userDto.setName(registerRequest.getName());
            userDto.setEmail(registerRequest.getEmail());
            userDto.setPassword(registerRequest.getPassword());
            userDto.setPhone(registerRequest.getPhone());
            userDto.setAddress(registerRequest.getAddress());
            userDto.setCity(registerRequest.getCity());
            userDto.setState(registerRequest.getState());
            userDto.setZipCode(registerRequest.getZipCode());

            // Map userType to Role
            User.Role role = User.Role.CUSTOMER; // default
            if ("seller".equalsIgnoreCase(registerRequest.getUserType())) {
                role = User.Role.SELLER;
            }
            
            UserDto registeredUser = userService.createUser(userDto, role);
            
            // Create authentication token
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            registerRequest.getEmail(),
                            registerRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", jwt);
            response.put("user", registeredUser);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User not authenticated"));
        }
        
        try {
            UserDto user = userService.getUserDtoByEmail(authentication.getName());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error retrieving user information"));
        }
    }
}
