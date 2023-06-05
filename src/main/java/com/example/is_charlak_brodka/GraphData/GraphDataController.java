package com.example.is_charlak_brodka.GraphData;

import com.thoughtworks.xstream.XStream;
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
                                                        @RequestParam(required = false) Integer yearStart, @RequestParam(required = false) Integer yearEnd) {

        if (yearStart != null && yearEnd != null) {
            if (countryCode != null) {
                return ResponseEntity.ok(graphDataService.getAllDataFromCountryBetween(countryCode, yearEnd, yearStart));
            }
            return ResponseEntity.ok(graphDataService.getAllDataBetween(yearEnd, yearStart));
        }
        if (countryCode != null) {
            return ResponseEntity.ok(graphDataService.getAllDataFromCountry(countryCode));
        }
        return ResponseEntity.ok(graphDataService.getAllData());
    }

    @GetMapping(value = "/xml", produces = "application/xml")
    public ResponseEntity<String> getGraphDataXML(@RequestParam(required = false) String countryCode) {
        XStream xstream = new XStream();
        xstream.alias("graphData", GraphData.class);
        if (countryCode != null) {
            List<GraphData> allDataFromCountry = graphDataService.getAllDataFromCountry(countryCode);
            return ResponseEntity.ok(xstream.toXML(allDataFromCountry));
        }
        List<GraphData> allData = graphDataService.getAllData();
        return ResponseEntity.ok(xstream.toXML(allData));
    }

}
