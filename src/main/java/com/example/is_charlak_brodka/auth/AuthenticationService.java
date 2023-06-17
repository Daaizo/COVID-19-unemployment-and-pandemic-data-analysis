package com.example.is_charlak_brodka.auth;

import com.example.is_charlak_brodka.auth.jwt.JwtService;
import com.example.is_charlak_brodka.users.Login;
import com.example.is_charlak_brodka.users.Register;
import com.example.is_charlak_brodka.users.User;
import com.example.is_charlak_brodka.users.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public TokenResponse register(Register request) {
        repository.findUserByEmail(request.getEmail())
                .ifPresent(user -> {
                    throw new UsernameNotFoundException("");
                });

        User user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        User savedUser = repository.save(user);
        String jwtToken = jwtService.generateToken(user);
        jwtService.generateToken(savedUser);
        return TokenResponse.builder()
                .jwtToken(jwtToken)
                .build();
    }

    public TokenResponse login(Login request) {
        User user = repository.findUserByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("user with given email not found"));
        String jwtToken = jwtService.generateToken(user);
        jwtService.generateToken(user);
        return TokenResponse.builder()
                .jwtToken(jwtToken)
                .role(user.getRole())
                .build();
    }
}
