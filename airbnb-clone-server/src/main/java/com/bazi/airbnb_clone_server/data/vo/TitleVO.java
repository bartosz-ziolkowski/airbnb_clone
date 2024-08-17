package com.bazi.airbnb_clone_server.data.vo;

import jakarta.validation.constraints.NotNull;

public record TitleVO(@NotNull(message = "Title value must be present") String value) {
}