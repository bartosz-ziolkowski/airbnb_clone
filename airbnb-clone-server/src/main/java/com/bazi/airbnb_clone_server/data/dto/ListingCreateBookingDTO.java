package com.bazi.airbnb_clone_server.data.dto;

import com.bazi.airbnb_clone_server.data.vo.PriceVO;

import java.util.UUID;

public record ListingCreateBookingDTO(
        UUID listingPublicId, PriceVO price) {
}