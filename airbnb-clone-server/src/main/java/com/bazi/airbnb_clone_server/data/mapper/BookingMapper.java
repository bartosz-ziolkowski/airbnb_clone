package com.bazi.airbnb_clone_server.data.mapper;

import com.bazi.airbnb_clone_server.data.dto.BookedDateDTO;
import com.bazi.airbnb_clone_server.data.dto.NewBookingDTO;
import com.bazi.airbnb_clone_server.models.Booking;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookingMapper {

    Booking newBookingToBooking(NewBookingDTO newBookingDTO);

    BookedDateDTO bookingToCheckAvailability(Booking booking);
}