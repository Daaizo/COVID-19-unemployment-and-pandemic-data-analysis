package com.example.is_charlak_brodka.GraphData;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GraphDataService {
    private final GraphDataRepository graphDataRepository;

    public List<GraphData> getAllData() {
        return graphDataRepository.findAll();
    }

    public List<GraphData> getAllDataBetween(Integer endYear, Integer startYear) {
        return graphDataRepository.findByYearBetweenOrderByYearAscMonthAsc(startYear, endYear);
    }

    public List<GraphData> getAllDataFromCountryBetween(String countryCode, Integer endYear, Integer startYear) {
        return graphDataRepository.findByCountryCodeAndYearBetweenOrderByYearAscMonthAsc(countryCode, startYear, endYear);
    }

    public List<GraphData> getAllDataFromCountry(String countryCode) {
        return graphDataRepository.findByCountryCodeOrderByYearAscMonthAsc(countryCode);
    }

    public void insertAll(List<GraphData> graphData) {
        graphDataRepository.saveAll(graphData);
    }
}
