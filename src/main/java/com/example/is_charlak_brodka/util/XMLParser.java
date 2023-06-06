package com.example.is_charlak_brodka.util;

import com.example.is_charlak_brodka.GraphData.GraphData;
import com.thoughtworks.xstream.XStream;

import java.util.List;

public class XMLParser {
    private XMLParser(){
    }
    public static String getGraphDataAsXML(List<GraphData> graphDataList){
            XStream xstream = new XStream();
            xstream.alias("graphData", GraphData.class);
            return xstream.toXML(graphDataList);
    }
}
