package com.example.is_charlak_brodka.auth;

import com.example.is_charlak_brodka.users.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenResponse {

    @JsonProperty("token")
    private String jwtToken;
    @JsonProperty("role")
    private Role role;
}
