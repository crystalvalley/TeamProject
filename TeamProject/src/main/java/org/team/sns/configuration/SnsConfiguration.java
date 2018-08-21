package org.team.sns.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.team.sns.interceptor.LoginInterceptor;

/**
 * @author ParkHyeokJoon
 * @since 2018.08.21
 * @version 2018.08.21
 */

@Configuration
@EnableConfigurationProperties
public class SnsConfiguration  implements WebMvcConfigurer{
		@Autowired
		LoginInterceptor loginInterceptor;
		
		@Override
		public void addInterceptors(InterceptorRegistry registry) {
			registry.addInterceptor(loginInterceptor).addPathPatterns("/AdminEditor");			
		}
}
