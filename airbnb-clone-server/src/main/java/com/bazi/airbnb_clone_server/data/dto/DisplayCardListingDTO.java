package com.bazi.airbnb_clone_server.data.dto;

import com.bazi.airbnb_clone_server.data.vo.PriceVO;
import com.bazi.airbnb_clone_server.models.BookingCategory;

import java.util.UUID;

public record DisplayCardListingDTO(PriceVO price,
                                    String location,
                                    PictureDTO cover,
                                    BookingCategory bookingCategory,
                                    UUID publicId) {
}