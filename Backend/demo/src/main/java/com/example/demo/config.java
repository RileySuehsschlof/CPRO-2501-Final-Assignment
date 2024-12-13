package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration  // Marks the class as a configuration class
public class config implements WebMvcConfigurer {

    // This method configures CORS globally
    @Override

    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")  // Apply CORS to all endpoints
                .allowedOrigins("*")  // Allow requests from any origin/portp
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allow necessary HTTP methods
                .allowedHeaders("*")  // Allow all headers
                .allowCredentials(true);
    }
}