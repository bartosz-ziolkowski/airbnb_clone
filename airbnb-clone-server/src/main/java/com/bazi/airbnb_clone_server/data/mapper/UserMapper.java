package com.bazi.airbnb_clone_server.data.mapper;

import com.bazi.airbnb_clone_server.data.dto.ReadUserDTO;
import com.bazi.airbnb_clone_server.models.Authority;
import com.bazi.airbnb_clone_server.models.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    ReadUserDTO readUserDTOToUser(User user);

    default String mapAuthoritiesToString(Authority authority) {
        return authority.getName();
    }

}