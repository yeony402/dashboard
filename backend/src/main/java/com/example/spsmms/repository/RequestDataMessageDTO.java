package com.example.spsmms.repository;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Component;

@Component
public class RequestDataMessageDTO {
    private JsonNode valveId;
    private Object key;
    private String state;

    public RequestDataMessageDTO() {
    }

//    public Object getKey() {
//        return valveId.fieldNames();
//    }
//
//    public String getState() {
//        return valveId.get("current").asText();
//    }

    public String getValveId() {
        return valveId.get("current").asText();
    }

}
