package com.bazi.airbnb_clone_server.data.vo;

import jakarta.validation.constraints.NotNull;

public record BedroomsVO(@NotNull(message = "Bedroom value must be present") int value) {
}
