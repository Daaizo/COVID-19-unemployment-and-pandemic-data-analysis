package com.example.is_charlak_brodka.GraphData;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GraphDataRepository extends JpaRepository<GraphData, Long> {
    List<GraphData> findByCountryCodeOrderByYearAscMonthAsc(String countryCode);

    List<GraphData> findByYearBetweenOrderByYearAscMonthAsc(Integer startYear, Integer endYear);

    List<GraphData> findByCountryCodeAndYearBetweenOrderByYearAscMonthAsc(String countryCode, Integer startYear, Integer endYear);
}