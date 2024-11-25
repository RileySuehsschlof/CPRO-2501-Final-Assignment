package com.example.demo.utility;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfig implements WebMvcConfigurer {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    // // Inject JwtAuthenticationFilter
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf().disable()
                .authorizeRequests()
                .requestMatchers("/login", "/register", "/", "/createaccount", "/checkEmail", "/checkPassword",
                        "/ProductsById/**", "/Products", "/ProductsByCategory/**") // Allow
                // public
                // routes
                .permitAll() // Public endpoints without token
                .requestMatchers("/error", "/error?continue") // Allow access to error pages
                .permitAll()
                .requestMatchers("/images/**") // Allow access to images (static resources)
                .permitAll()
                .requestMatchers("/account/**").authenticated() // Secured endpoints
                .anyRequest().authenticated() // Protect all other routes
                .and()
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class) // Add JWT filter
                .cors() // Enable CORS in Spring Security
                .and()
                .build();
    }

    // Configure CORS globally
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Apply CORS to all endpoints
                .allowedOrigins("http://localhost:3000") 
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow HTTP methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow credentials (cookies, headers)
                
    }
    
}
