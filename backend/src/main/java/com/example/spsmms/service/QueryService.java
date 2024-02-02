package com.example.spsmms.service;

import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Service
public class QueryService {

    private final JdbcTemplate jdbcTemplate;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public QueryService(JdbcTemplate jdbcTemplate, SimpMessagingTemplate messagingTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.messagingTemplate = messagingTemplate;
    }

    public void getDataFromDatabase() {
        String sql = "SELECT * FROM test";
        jdbcTemplate.query(sql, (ResultSet rs) -> {
            try {
                // ResultSet에서 데이터를 읽어와 클라이언트로 전송합니다.
                while (rs.next()) {
                    String message = rs.getString("now_Time_Str"); // 데이터베이스 컬럼명으로 변경
                    messagingTemplate.convertAndSend("/dashboard/data", message);
                    Thread.sleep(1000);
                }
            } catch (SQLException | InterruptedException e) {
                e.printStackTrace();
            }
//            entity.setNow_Time_Str(resultSet.getString("now_Time_Str"));
//            entity.setAir_Temperature(resultSet.getString("Air_Temperature"));
        });
    }
}
