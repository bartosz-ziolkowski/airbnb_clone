package com.bazi.airbnb_clone_server.repositories;

import com.bazi.airbnb_clone_server.models.ListingPicture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListingPictureRepository extends JpaRepository<ListingPicture, Long> {
}
