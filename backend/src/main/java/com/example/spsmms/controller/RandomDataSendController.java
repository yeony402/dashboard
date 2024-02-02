package com.example.spsmms.controller;
import com.example.spsmms.repository.RequestDataMessageDTO;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Getter;
import lombok.Setter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;


@Controller
@EnableScheduling
public class RandomDataSendController {
    private final SimpMessagingTemplate messagingTemplate;
    private final JdbcTemplate jdbcTemplate;
    private final RequestDataMessageDTO requestDataMessageDTO;

    public RandomDataSendController(SimpMessagingTemplate messagingTemplate, JdbcTemplate jdbcTemplate, RequestDataMessageDTO requestDataMessageDTO) {
        this.messagingTemplate = messagingTemplate;
        this.jdbcTemplate = jdbcTemplate;
        this.requestDataMessageDTO = requestDataMessageDTO;
    }

    @JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
    @Setter
    @Getter
    public static class InitData {
        private String time;
        private int temp;
        private int humidity;
        private int weather;
        private int wind;
        private int rainfall;
        private int ultraDust;
        private int dust;
        private int iT1;
        private int iGS1;
        private int tSL1;
        private int tSL2;
        private int tST1;
        private int tST2;
        private int tST3;
        private int tSVL1;
        private int tSVL2;
        private int tSP1;
        private int tSP2;
        private int oT1;
        private int oGS1;
        // 저장 탱크 입력단
        private String iV1;
        private String iM1;
        private String iSV1;
        private String iMV1;
        // 저장 탱크
        private String tSSV1;
        private String tSSV2;
        private String tSMV1;
        private String tSMV2;
        // 저장 탱크 출력단
        private String oV1;
        private String oM1;
        private String oSV1;
        private String oMV1;
    }

    @JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
    @Setter
    public static class UpdateState{
        String updateData;
    }


    @Scheduled(fixedDelay = 1000) //1초 간격으로 데이터 전송
    public void sendDataToClient() {
        try {
            Random random = new Random();
            SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
            String currentTime = dateFormat.format(new Date());

            int temp = random.nextInt(91) - 30;
            int humidity = random.nextInt(101);
            int weather = random.nextInt(101);
            int wind = random.nextInt(101);
            int rainfall = random.nextInt(101);
            int ultraDust = random.nextInt(101);
            int dust = random.nextInt(101);
            int iT1 = random.nextInt(26) - 270;
            int iGS1 = random.nextInt(101);
            int tSL1 = random.nextInt(101);
            int tSL2 = random.nextInt(101);
            int tST1 = random.nextInt(26) - 270;
            int tST2 = random.nextInt(26) - 270;
            int tST3 = random.nextInt(26) - 270;
            int tSVL1 = random.nextInt(101);
            int tSVL2 = random.nextInt(101);
            int tSP1 = random.nextInt(101);
            int tSP2 = random.nextInt(101);
            int oT1 = random.nextInt(26) - 270;
            int oGS1 = random.nextInt(101);

            String iV1 = "Open";
            String iM1 = "Yes";
            String iSV1 = "Yes";
            String iMV1 = "Yes";
            String tSSV1 = "Open";
            String tSSV2 = "Colse";
            String tSMV1 = "Close";
            String tSMV2 = "Close";
            String oV1 = "Close";
            String oM1 = "No";
            String oSV1 = "No";
            String oMV1 = "No";

            InitData initData = new InitData();
            initData.setTime(currentTime);
            initData.setTemp(temp);
            initData.setHumidity(humidity);
            initData.setWeather(weather);
            initData.setWind(wind);
            initData.setRainfall(rainfall);
            initData.setUltraDust(ultraDust);
            initData.setDust(dust);
            initData.setIT1(iT1);
            initData.setIGS1(iGS1);
            initData.setTSL1(tSL1);
            initData.setTSL2(tSL2);
            initData.setTST1(tST1);
            initData.setTST2(tST2);
            initData.setTST3(tST3);
            initData.setTSVL1(tSVL1);
            initData.setTSVL2(tSVL2);
            initData.setTSP1(tSP1);
            initData.setTSP2(tSP2);
            initData.setOT1(oT1);
            initData.setOGS1(oGS1);

            initData.setIV1(iV1);
            initData.setIM1(iM1);
            initData.setISV1(iSV1);
            initData.setIMV1(iMV1);
            initData.setTSSV1(tSSV1);
            initData.setTSSV2(tSSV2);
            initData.setTSMV1(tSMV1);
            initData.setTSMV2(tSMV2);
            initData.setOV1(oV1);
            initData.setOM1(oM1);
            initData.setOSV1(oSV1);
            initData.setOMV1(oMV1);
            // open/close 값은 고정값으로, 바꿔도 다시 돌아가는 상황이기 때문에 나중에 데이터베이스 업데이트 할 때 적용

            messagingTemplate.convertAndSend("/topic/current-data", initData);
        } catch (Exception e) {
            e.printStackTrace(); // 또는 로깅 프레임워크를 사용하여 로그에 기록
        }
    }


    @MessageMapping("/request-data")
    public void handleRequestData(@Payload RequestDataMessageDTO messageDTO) {
        String valveId = messageDTO.getValveId();
        System.out.println("Received request for valveId: " + valveId);

        String valveState = "";
        if (valveId.equals("Open")) valveState = "Close";
        else if (valveId.equals("Close")) valveState = "Open";
        else if (valveId.equals("Yes")) valveState = "No";
        else if (valveId.equals("No")) valveState = "Yes";

        UpdateState updateState = new UpdateState();
        updateState.setUpdateData(valveState);


        // 클라이언트에 응답 메시지 보내기
        messagingTemplate.convertAndSend("/topic/response-data", updateState);
    }
}
