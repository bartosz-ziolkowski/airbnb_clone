package com.bazi.airbnb_clone_server.data.vo;

import jakarta.validation.constraints.NotNull;

public record PriceVO(@NotNull(message = "Price value must be present") int value) {
}