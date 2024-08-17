package com.bazi.airbnb_clone_server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories({"com.bazi.airbnb_clone_server.repositories"})
@EnableTransactionManagement
@EnableJpaAuditing
public class DatabaseConfig {
}