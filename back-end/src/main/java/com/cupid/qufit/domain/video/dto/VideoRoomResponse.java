package com.cupid.qufit.domain.video.dto;

import com.cupid.qufit.entity.Member;
import com.cupid.qufit.entity.MemberHobby;
import com.cupid.qufit.entity.MemberPersonality;
import com.cupid.qufit.entity.video.VideoRoom;
import com.cupid.qufit.entity.video.VideoRoomHobby;
import com.cupid.qufit.entity.video.VideoRoomParticipant;
import com.cupid.qufit.entity.video.VideoRoomPersonality;
import com.cupid.qufit.entity.video.VideoRoomStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoRoomResponse {

    @Schema(description = "채팅방ID")
    private Long videoRoomId; // 방 id
    @Schema(description = "방 제목")
    private String videoRoomName; // 방 제목
    @Schema(description = "방 상태")
    private VideoRoomStatus status; //방 상태
    @Schema(description = "생성일시")
    private LocalDateTime createdAt; // 생성일시
    @Schema(description = "최대 인원수")
    private int maxParticipants; // 최대 인원수
    @Schema(description = "현재 남자 수")
    private int curMCount; // 현재 남자 수
    @Schema(description = "현재 여자 수")
    private int curWCount; // 현재 여자 수
    @Schema(description = "참가자")
    private List<VideoRoomParticipant> participants; // 참가자
    @Schema(description = "방 취미 태그")
    private List<String> videoRoomHobby; // 방 취미 태그
    @Schema(description = "방 성격 태그")
    private List<String> videoRoomPersonality; // 방 성격 태그
    @Schema(description = "방 참가 토큰")
    private String token; // 방 참가 토큰

    // 참가자의 성격 및 취미 정보를 담을 필드
    @Schema(description = "참가자들의 취미")
    private List<String> participantHobbies;
    @Schema(description = "참가자들의 성격")
    private List<String> participantPersonalities;

    public static VideoRoomResponse from(VideoRoom videoRoom, String token) {
        return VideoRoomResponse.builder()
                                .videoRoomId(videoRoom.getVideoRoomId())
                                .videoRoomName(videoRoom.getVideoRoomName())
                                .status(videoRoom.getStatus())
                                .createdAt(videoRoom.getCreatedAt())
                                .maxParticipants(videoRoom.getMaxParticipants())
                                .curMCount(videoRoom.getCurMCount())
                                .curWCount(videoRoom.getCurWCount())
                                .videoRoomHobby(toVideoRoomHobbiesList(videoRoom.getVideoRoomHobby()))
                                .videoRoomPersonality(toVideoRoomPersonalitiesList(videoRoom.getVideoRoomPersonality()))
                                .token(token)
                                .build();
    }

    public static VideoRoomResponse withDetails(VideoRoom videoRoom) {
        // ! 1. 방 참가자 태그들 가져오기
        Map<String, Integer> hobbyCountMap = new HashMap<>();
        Map<String, Integer> personalityCountMap = new HashMap<>();

        for (VideoRoomParticipant participant : videoRoom.getParticipants()) {
            Member member = participant.getMember();
            for (MemberHobby hobby : member.getMemberHobbies()) {
                String hobbyName = hobby.getTag().getTagName();
                hobbyCountMap.put(hobbyName, hobbyCountMap.getOrDefault(hobbyName, 0) + 1);
            }
            for (MemberPersonality personality : member.getMemberPersonalities()) {
                String personalityName = personality.getTag().getTagName();
                personalityCountMap.put(personalityName, personalityCountMap.getOrDefault(personalityName, 0) + 1);
            }
        }

        // ! 2. 빈도수 기준으로 정렬
        List<String> hobbies = hobbyCountMap.entrySet().stream()
                                            .sorted((e1, e2) -> e2.getValue()
                                                                  .compareTo(e1.getValue()))
                                            .map(Map.Entry::getKey)
                                            .toList();

        List<String> personalities = personalityCountMap.entrySet().stream()
                                                        .sorted((e1, e2) -> e2.getValue().compareTo(
                                                                e1.getValue()))
                                                        .map(Map.Entry::getKey)
                                                        .toList();

        return VideoRoomResponse.builder()
                                .videoRoomName(videoRoom.getVideoRoomName())
                                .createdAt(videoRoom.getCreatedAt())
                                .maxParticipants(videoRoom.getMaxParticipants())
                                .curMCount(videoRoom.getCurMCount())
                                .curWCount(videoRoom.getCurWCount())
                                .videoRoomHobby(toVideoRoomHobbiesList(videoRoom.getVideoRoomHobby()))
                                .videoRoomPersonality(toVideoRoomPersonalitiesList(videoRoom.getVideoRoomPersonality()))
                                .participantHobbies(hobbies)
                                .participantPersonalities(personalities)
                                .build();
    }

    public static VideoRoomResponse toBasicResponse(VideoRoom videoRoom) {
        return VideoRoomResponse.builder()
                                .videoRoomId(videoRoom.getVideoRoomId())
                                .videoRoomName(videoRoom.getVideoRoomName())
                                .maxParticipants(videoRoom.getMaxParticipants())
                                .curMCount(videoRoom.getCurMCount())
                                .curWCount(videoRoom.getCurWCount())
                                .videoRoomHobby(toVideoRoomHobbiesList(videoRoom.getVideoRoomHobby()))
                                .videoRoomPersonality(toVideoRoomPersonalitiesList(videoRoom.getVideoRoomPersonality()))
                                .build();
    }


    public static List<String> toVideoRoomHobbiesList(List<VideoRoomHobby> hobbies) {
        List<String> participantHobbies = new ArrayList<>();
        for (VideoRoomHobby videoRoomHobby : hobbies) {
            participantHobbies.add(videoRoomHobby.getTag().getTagName());
        }
        return participantHobbies;
    }

    public static List<String> toVideoRoomPersonalitiesList(List<VideoRoomPersonality> personalities) {
        List<String> participantPersonalities = new ArrayList<>();
        for (VideoRoomPersonality videoRoomPersonality : personalities) {
            participantPersonalities.add(videoRoomPersonality.getTag().getTagName());
        }
        return participantPersonalities;
    }
}
