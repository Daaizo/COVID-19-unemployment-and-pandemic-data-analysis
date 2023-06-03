package com.example.is_charlak_brodka.GraphData;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/graphData")
@RequiredArgsConstructor
public class GraphDataController {

    private final GraphDataService graphDataService;

    @GetMapping()
    public ResponseEntity<List<GraphData>> getCovidData(@RequestParam(required = false) String countryCode){
        if (!"".equals(countryCode)) {
            return ResponseEntity.ok(graphDataService.getAllDataFromCountry(countryCode));
        }
        return ResponseEntity.ok(graphDataService.getAllData());
    }

}
