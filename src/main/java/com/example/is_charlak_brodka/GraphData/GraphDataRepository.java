package com.example.is_charlak_brodka.GraphData;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GraphDataRepository extends JpaRepository<GraphData, Long> {
    List<GraphData> findByCountryCode(String countryCode);
}