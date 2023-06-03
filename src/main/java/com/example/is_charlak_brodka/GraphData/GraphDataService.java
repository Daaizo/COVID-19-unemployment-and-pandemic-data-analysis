package com.example.is_charlak_brodka.GraphData;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GraphDataService {
    private final GraphDataRepository graphDataRepository;

    public List<GraphData> getAllData() {
        return graphDataRepository.findAll();
    }

    public List<GraphData> getAllDataFromCountry(String countryCode) {
        return graphDataRepository.findByCountryCode(countryCode);
    }
    public void insertAll(List<GraphData> graphData) {
        graphDataRepository.saveAll(graphData);
    }
}
