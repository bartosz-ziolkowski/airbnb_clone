package com.bazi.airbnb_clone_server.data.vo;

import jakarta.validation.constraints.NotNull;

public record BedsVO(@NotNull(message = "beds value must be present") int value) {
}