package com.example.is_charlak_brodka.GraphData;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class GraphData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String month;
    private String year;

    @Column(name = "country_code")
    private String countryCode;

    @Column(name = "total_number_of_cases")
    private Double totalNumberOfCases;

    @Column(name = "unemployment_percent_value")
    private Double unemploymentPercentValue;
}
