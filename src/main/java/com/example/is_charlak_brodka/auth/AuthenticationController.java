package com.example.is_charlak_brodka.auth;

import com.example.is_charlak_brodka.users.Login;
import com.example.is_charlak_brodka.users.Register;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<TokenResponse> register(@RequestBody Register request) {
        try {
            TokenResponse register = service.register(request);
            return ResponseEntity.ok(register);
        } catch (UsernameNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "User with that email already exist");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody Login request) {
        return ResponseEntity.ok(service.login(request));
    }

}
