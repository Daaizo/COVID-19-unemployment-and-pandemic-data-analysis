package com.example.is_charlak_brodka.users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Register {

    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Role role;
}
