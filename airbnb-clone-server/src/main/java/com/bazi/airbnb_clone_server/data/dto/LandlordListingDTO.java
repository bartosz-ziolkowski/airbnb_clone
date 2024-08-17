package com.bazi.airbnb_clone_server.data.dto;

import jakarta.validation.constraints.NotNull;

public record LandlordListingDTO(@NotNull String firstname,
                                 @NotNull String imageUrl) {
}