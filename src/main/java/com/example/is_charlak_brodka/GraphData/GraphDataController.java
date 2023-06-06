package com.example.is_charlak_brodka.GraphData;

import com.example.is_charlak_brodka.util.XMLParser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/graphData")
@RequiredArgsConstructor
public class GraphDataController {

    private final GraphDataService graphDataService;

    @GetMapping()
    public ResponseEntity<List<GraphData>> getGraphData(@RequestParam(required = false) String countryCode,
                                                        @RequestParam(required = false) Integer yearStart,
                                                        @RequestParam(required = false) Integer yearEnd) {
        return ResponseEntity.ok(getListOfGraphDataBasedOnParameters(countryCode, yearStart, yearEnd));
    }

    @GetMapping(value = "/xml", produces = "application/xml")
    public ResponseEntity<String> getGraphDataXML(@RequestParam(required = false) String countryCode,
                                                  @RequestParam(required = false) Integer yearStart,
                                                  @RequestParam(required = false) Integer yearEnd) {
        List<GraphData> listOfGraphDataBasedOnParameters = getListOfGraphDataBasedOnParameters(countryCode, yearStart, yearEnd);
        return ResponseEntity.ok(XMLParser.getGraphDataAsXML(listOfGraphDataBasedOnParameters));
    }

    private List<GraphData> getListOfGraphDataBasedOnParameters(String countryCode, Integer yearStart, Integer yearEnd) {
        if (yearStart != null && yearEnd != null) {
            if (countryCode != null) {
                return graphDataService.getAllDataFromCountryBetween(countryCode, yearEnd, yearStart);
            }
            return graphDataService.getAllDataBetween(yearEnd, yearStart);
        }
        if (countryCode != null) {
            return graphDataService.getAllDataFromCountry(countryCode);
        }
        return graphDataService.getAllData();
    }
}
