package com.bazi.airbnb_clone_server.controllers;

import com.bazi.airbnb_clone_server.config.SecurityUtils;
import com.bazi.airbnb_clone_server.data.State;
import com.bazi.airbnb_clone_server.data.StatusNotification;
import com.bazi.airbnb_clone_server.data.dto.*;
import com.bazi.airbnb_clone_server.exceptions.UserException;
import com.bazi.airbnb_clone_server.services.LandlordService;
import com.bazi.airbnb_clone_server.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/landlord-listing")
public class LandlordController {

    private final LandlordService landlordService;

    private final Validator validator;

    private final UserService userService;

    private ObjectMapper objectMapper = new ObjectMapper();


    public LandlordController(LandlordService landlordService, Validator validator, UserService userService) {
        this.landlordService = landlordService;
        this.validator = validator;
        this.userService = userService;
    }


    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CreatedListingDTO> create(
            MultipartHttpServletRequest request,
            @RequestPart(name = "dto") String saveListingDTOString
    ) throws IOException {
        List<PictureDTO> pictures = request.getFileMap()
                .values()
                .stream()
                .map(mapMultipartFileToPictureDTO())
                .toList();

        SaveListingDTO saveListingDTO = objectMapper.readValue(saveListingDTOString, SaveListingDTO.class);
        saveListingDTO.setPictures(pictures);

        Set<ConstraintViolation<SaveListingDTO>> violations = validator.validate(saveListingDTO);
        if (!violations.isEmpty()) {
            String violationsJoined = violations.stream()
                    .map(violation -> violation.getPropertyPath() + " " + violation.getMessage())
                    .collect(Collectors.joining());

            ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, violationsJoined);
            return ResponseEntity.of(problemDetail).build();
        } else {
            return ResponseEntity.ok(landlordService.create(saveListingDTO));
        }
    }


    private static Function<MultipartFile, PictureDTO> mapMultipartFileToPictureDTO() {
        return multipartFile -> {
            try {
                return new PictureDTO(multipartFile.getBytes(), multipartFile.getContentType(), false);
            } catch (IOException ioe) {
                throw new UserException(String.format("Cannot parse multipart file: %s", multipartFile.getOriginalFilename()));
            }
        };
    }

    @GetMapping(value = "/get-all")
    @PreAuthorize("hasAnyRole('" + SecurityUtils.ROLE_LANDLORD + "')")
    public ResponseEntity<List<DisplayCardListingDTO>> getAll() {
        ReadUserDTO connectedUser = userService.getAuthenticatedUserFromSecurityContext();
        List<DisplayCardListingDTO> allProperties = landlordService.getAllProperties(connectedUser);
        return ResponseEntity.ok(allProperties);
    }

    @DeleteMapping("/delete")
    @PreAuthorize("hasAnyRole('" + SecurityUtils.ROLE_LANDLORD + "')")
    public ResponseEntity<UUID> delete(@RequestParam UUID publicId) {
        ReadUserDTO connectedUser = userService.getAuthenticatedUserFromSecurityContext();
        State<UUID, String> deleteState = landlordService.delete(publicId, connectedUser);
        if (deleteState.getStatus().equals(StatusNotification.OK)) {
            return ResponseEntity.ok(deleteState.getValue());
        } else if (deleteState.getStatus().equals(StatusNotification.UNAUTHORIZED)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}