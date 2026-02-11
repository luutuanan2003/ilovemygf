package com.valentine.api.controller;

import com.valentine.api.model.MessageRequest;
import com.valentine.api.model.MessageResponse;
import com.valentine.api.service.ClaudeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class LoveMessageController {

    private final ClaudeService claudeService;
    private final Random random = new Random();

    private static final String[] CATEGORIES = {"sweet", "flirty", "funny", "deep", "good-morning", "good-night"};
    private static final String[] MOODS = {"playful", "romantic", "poetic", "casual"};

    @PostMapping("/generate-message")
    public ResponseEntity<MessageResponse> generateMessage(@RequestBody MessageRequest request) {
        String category = request.getCategory() != null ? request.getCategory() : "sweet";
        String mood = request.getMood() != null ? request.getMood() : "romantic";

        String message = claudeService.generateLoveMessage(category, mood);

        return ResponseEntity.ok(MessageResponse.builder()
                .message(message)
                .category(category)
                .timestamp(Instant.now().toString())
                .build());
    }

    @GetMapping("/random-message")
    public ResponseEntity<MessageResponse> randomMessage() {
        String category = CATEGORIES[random.nextInt(CATEGORIES.length)];
        String mood = MOODS[random.nextInt(MOODS.length)];

        String message = claudeService.generateLoveMessage(category, mood);

        return ResponseEntity.ok(MessageResponse.builder()
                .message(message)
                .category(category)
                .timestamp(Instant.now().toString())
                .build());
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "healthy",
                "service", "love-message-api"
        ));
    }
}
