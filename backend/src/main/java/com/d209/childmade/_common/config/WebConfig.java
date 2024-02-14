package com.d209.childmade._common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "https://i10d209.p.ssafy.io")
                .allowedMethods("GET", "POST","PUT","DELETE")
                .allowCredentials(true)
                .maxAge(3000);
    }
}