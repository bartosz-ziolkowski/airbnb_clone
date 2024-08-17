package com.bazi.airbnb_clone_server.data.dto;

import com.bazi.airbnb_clone_server.data.vo.BathsVO;
import com.bazi.airbnb_clone_server.data.vo.BedroomsVO;
import com.bazi.airbnb_clone_server.data.vo.BedsVO;
import com.bazi.airbnb_clone_server.data.vo.GuestsVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record ListingInfoDTO(
        @NotNull @Valid GuestsVO guests,
        @NotNull @Valid BedroomsVO bedrooms,
        @NotNull @Valid BedsVO beds,
        @NotNull @Valid BathsVO baths) {
}
