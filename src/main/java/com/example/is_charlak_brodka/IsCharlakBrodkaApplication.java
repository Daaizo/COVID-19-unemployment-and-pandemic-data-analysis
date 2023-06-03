package com.example.is_charlak_brodka;

import com.example.is_charlak_brodka.GraphData.GraphData;
import com.example.is_charlak_brodka.GraphData.GraphDataService;
import com.example.is_charlak_brodka.util.CSVHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;

@SpringBootApplication
@RequiredArgsConstructor

public class IsCharlakBrodkaApplication {

    public static void main(String[] args) {
        SpringApplication.run(IsCharlakBrodkaApplication.class, args);
    }

}
