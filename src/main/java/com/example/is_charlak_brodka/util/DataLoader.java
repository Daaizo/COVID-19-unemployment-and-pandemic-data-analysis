package com.example.is_charlak_brodka.util;

import com.example.is_charlak_brodka.GraphData.GraphData;
import com.example.is_charlak_brodka.GraphData.GraphDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class DataLoader implements ApplicationRunner {

    private final GraphDataService graphDataService;

    public void run(ApplicationArguments args) {
        ArrayList<GraphData> graphData = CSVHelper.initData();
        graphDataService.insertAll(graphData);
    }
}