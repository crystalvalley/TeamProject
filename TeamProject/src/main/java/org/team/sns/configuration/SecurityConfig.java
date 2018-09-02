package org.team.sns.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.team.sns.service.SecurityUserServiceImpl;

/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.08.23
 * @version 2018.08.31
 *
 */

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	SecurityUserServiceImpl userService;
	@Autowired
	SNSLoginSuccessHandler snsLoginSuccessHandler;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable()
			.authorizeRequests()
				.requestMatchers(CorsUtils::isPreFlightRequest).permitAll()			
				.antMatchers("/loginCheck").permitAll()
				.antMatchers("/boards/**").permitAll()
				.antMatchers("/lists/**").permitAll()
				.antMatchers("/resources/**").permitAll()
				.antMatchers("/account/**").permitAll()
				.antMatchers("/idCheck").permitAll()
				.antMatchers("/static/js/*.js").permitAll()
				.antMatchers("/signup").permitAll()
				.antMatchers("/signin").permitAll()
				.anyRequest().authenticated()
			.and().cors()
			.and()
				.formLogin().loginPage("/signin")
				.usernameParameter("userid")
				.passwordParameter("password")
				.successHandler(snsLoginSuccessHandler)
			.and()
				.logout().logoutUrl("/logout").logoutSuccessUrl("/signin");
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userService).passwordEncoder(userService.passwordEncoder());
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.addAllowedOrigin("*");
		configuration.addAllowedMethod("*");
		configuration.addAllowedHeader("*");
		configuration.setAllowCredentials(true);
		configuration.setMaxAge(3600L);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

}
