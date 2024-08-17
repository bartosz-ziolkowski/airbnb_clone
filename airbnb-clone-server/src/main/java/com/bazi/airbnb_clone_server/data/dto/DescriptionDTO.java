package com.bazi.airbnb_clone_server.data.dto;

import com.bazi.airbnb_clone_server.data.vo.DescriptionVO;
import com.bazi.airbnb_clone_server.data.vo.TitleVO;
import jakarta.validation.constraints.NotNull;

public record DescriptionDTO(
        @NotNull TitleVO title,
        @NotNull DescriptionVO description
) {
}