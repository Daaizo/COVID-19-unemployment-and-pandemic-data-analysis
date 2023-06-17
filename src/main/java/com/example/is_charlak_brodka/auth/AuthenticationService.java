package com.example.is_charlak_brodka.auth;

import com.example.is_charlak_brodka.auth.jwt.JwtService;
import com.example.is_charlak_brodka.users.Login;
import com.example.is_charlak_brodka.users.Register;
import com.example.is_charlak_brodka.users.User;
import com.example.is_charlak_brodka.users.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    @Transactional(isolation = Isolation.READ_COMMITTED)
    // zapewnia aktualność odczytywanych danych, co może być ważne podczas rejestracji użytkownika, aby upewnić się, że nie ma konfliktów z już istniejącymi użytkownikam
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

    @Transactional(isolation = Isolation.REPEATABLE_READ)
    //zapewnia spójność danych podczas procesu logowania, aby uniknąć sytuacji, w której dane o użytkowniku ulegają zmianie w trakcie logowania, co mogłoby prowadzić do nieprawidłowego uwierzytelnienia.
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
