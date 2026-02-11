package com.valentine.api.model;

import lombok.Data;

@Data
public class MessageRequest {
    private String category; // sweet, flirty, funny, deep, good-morning, good-night
    private String mood;     // playful, romantic, poetic, casual
}
