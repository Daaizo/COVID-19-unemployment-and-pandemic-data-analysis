package com.example.is_charlak_brodka.util;

import com.example.is_charlak_brodka.GraphData.GraphData;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.*;

public class CSVHelper {

    public static ArrayList<GraphData> initData() {
        Map<String, Double> covidData = getCovidData();
        Map<String, Double> unemploymentData = getUnemploymentData();
        Map<String, List<Double>> mergedData = new HashMap<>();

        mergeData(covidData, mergedData);
        mergeData(unemploymentData, mergedData);
        ArrayList<GraphData> graphDataList = new ArrayList<>();

        mergedData.forEach((key, doubles) -> {
            if (doubles.size() == 2) {
                String country = key.split("_")[0];
                String month = key.split("_")[1];
                String year = key.split("_")[2];
                graphDataList.add(new GraphData(null, Integer.parseInt(month), Integer.parseInt(year), country, doubles.get(0), doubles.get(1)));
            }
        });
        return graphDataList;

    }

    private static void mergeData(Map<String, Double> covidData, Map<String, List<Double>> mergedData) {
        covidData.forEach((key, value) -> {
            if (mergedData.get(key) != null) {
                mergedData.get(key).add(value);
            } else {
                mergedData.put(key, new ArrayList<>(Collections.singleton(value)));
            }
        });
    }

    private static Map<String, Double> getCovidData() {
        enum CovidDataHeaders {
            Date_reported, Country_code, Country, WHO_region, New_cases, Cumulative_cases, New_deaths, Cumulative_deaths
        }
        String csvFilePath2 = "src/main/resources/static/WHO-COVID-19-global-data.csv";
        CSVFormat csvFormat2 = CSVFormat.DEFAULT.builder()
                .setDelimiter(",")
                .setHeader(CovidDataHeaders.class)
                .setSkipHeaderRecord(true)
                .build();
        try (Reader reader = new FileReader(csvFilePath2);
             CSVParser csvParser = new CSVParser(reader, csvFormat2)) {

            Map<String, Double> data = new HashMap<>();
            for (CSVRecord csvRecord : csvParser) {
                String location = csvRecord.get(CovidDataHeaders.Country_code);
                String time = csvRecord.get(CovidDataHeaders.Date_reported);
                String value = csvRecord.get(CovidDataHeaders.New_cases);
                String month = time.split("-")[1];
                String year = time.split("-")[0];
                String key = location + "_" + month + "_" + year;
                data.put(key, data.getOrDefault(key, 0.00) + Double.parseDouble(value));
            }
            return data;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private static Map<String, Double> getUnemploymentData() {
        enum UnemploymentDataHeaders {
            LOCATION, INDICATOR, SUBJECT, MEASURE, FREQUENCY, TIME, Value
        }

        String csvFilePath = "src/main/resources/static/unemployment_data_wordlwide.csv";
        CSVFormat csvFormat = CSVFormat.DEFAULT.builder()
                .setDelimiter(",")
                .setHeader(UnemploymentDataHeaders.class)
                .setSkipHeaderRecord(true)
                .build();
        try (Reader reader = new FileReader(csvFilePath);
             CSVParser csvParser = new CSVParser(reader, csvFormat)) {
            Map<String, Double> data = new HashMap<>();
            for (CSVRecord csvRecord : csvParser) {
                String location = csvRecord.get(UnemploymentDataHeaders.LOCATION);
                String time = csvRecord.get(UnemploymentDataHeaders.TIME);
                String value = csvRecord.get(UnemploymentDataHeaders.Value);
                String month = time.split("-")[1];
                String year = time.split("-")[0];
                String key = location + "_" + month + "_" + year;
                data.put(key, data.getOrDefault(key, 0.00) + Double.parseDouble(value));
            }
            return data;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
