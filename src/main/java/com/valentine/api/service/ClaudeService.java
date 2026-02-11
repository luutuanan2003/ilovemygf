package com.valentine.api.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Slf4j
@Service
public class ClaudeService {

    @Value("${anthropic.api-key:}")
    private String apiKey;

    @Value("${anthropic.model:claude-sonnet-4-20250514}")
    private String model;

    @Value("${anthropic.max-tokens:150}")
    private int maxTokens;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    private final Random random = new Random();
    private List<String> cachedMessages = new ArrayList<>();

    public ClaudeService() {
        this.webClient = WebClient.builder()
                .baseUrl("https://api.anthropic.com/v1")
                .build();
        this.objectMapper = new ObjectMapper();
    }

    @PostConstruct
    public void loadCachedMessages() {
        try {
            ClassPathResource resource = new ClassPathResource("cached-messages.json");
            InputStream is = resource.getInputStream();
            JsonNode root = objectMapper.readTree(is);
            if (root.isArray()) {
                for (JsonNode node : root) {
                    cachedMessages.add(node.asText());
                }
            }
            log.info("Loaded {} cached messages", cachedMessages.size());
        } catch (Exception e) {
            log.warn("Could not load cached messages: {}", e.getMessage());
            // Add some hardcoded fallback messages
            cachedMessages.addAll(List.of(
                "Every moment with you feels like a beautiful dream I never want to wake up from.",
                "You make ordinary days feel extraordinary just by being in them.",
                "I fall for you a little more every single day, and honestly it's getting ridiculous how much I love you.",
                "The way you laugh makes my whole world brighter.",
                "You're my favorite notification, my favorite hello, and my hardest goodbye.",
                "I didn't know what I was missing until you walked into my life.",
                "With you, even silence feels like the best conversation.",
                "You're the reason I look forward to tomorrow.",
                "My heart does this little skip thing every time I see your name pop up. It's embarrassing, really.",
                "If I could rearrange the alphabet, I'd put U and I together... okay that was cheesy but I mean it."
            ));
        }
    }

    public String generateLoveMessage(String category, String mood) {
        if (apiKey == null || apiKey.isBlank()) {
            log.warn("No Anthropic API key configured, using cached message");
            return getRandomCachedMessage();
        }

        try {
            String systemPrompt = """
                You are a love message generator for a boyfriend who wants to express love to his girlfriend named Snoopy on Valentine's Day. \
                Generate short, sweet, and genuine love messages (1-3 sentences max). Address her as "Snoopy" naturally in some messages \
                (not every single one — mix it up). The messages should feel personal and warm \
                - like something a real person would text, NOT like a greeting card or a famous quote. Vary between cute, romantic, \
                playful, and heartfelt tones. Never be generic. Never use cliches like "you complete me" or "you are my everything" \
                unless making it fresh. The message should make her smile or blush.

                Category: %s
                Mood: %s

                Respond with ONLY the love message, nothing else. No quotes around it."""
                .formatted(
                    category != null ? category : "sweet",
                    mood != null ? mood : "romantic"
                );

            Map<String, Object> body = Map.of(
                "model", model,
                "max_tokens", maxTokens,
                "system", systemPrompt,
                "messages", List.of(Map.of(
                    "role", "user",
                    "content", "Generate a love message."
                ))
            );

            String response = webClient.post()
                .uri("/messages")
                .header("x-api-key", apiKey)
                .header("anthropic-version", "2023-06-01")
                .header("content-type", "application/json")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .block();

            JsonNode responseJson = objectMapper.readTree(response);
            String message = responseJson.get("content").get(0).get("text").asText();
            return message.trim();

        } catch (Exception e) {
            log.error("Error calling Claude API: {}", e.getMessage());
            return getRandomCachedMessage();
        }
    }

    public String getRandomCachedMessage() {
        if (cachedMessages.isEmpty()) {
            return "You are the most wonderful thing that has ever happened to me.";
        }
        return cachedMessages.get(random.nextInt(cachedMessages.size()));
    }
}
