package org.team.sns.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.team.sns.service.SecurityUserServiceImpl;

/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.08.23
 * @version 2018.08.23
 *
 */

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	SecurityUserServiceImpl userService;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable()
			.authorizeRequests()
				.antMatchers("/boards/**").permitAll()
				.antMatchers("/idCheck").permitAll()
				.antMatchers("/static/js/*.js").permitAll()
				.antMatchers("/signup").permitAll()
				.antMatchers("/signin").permitAll()
				.anyRequest().authenticated()
			.and()
				.formLogin().loginPage("/signin")
				.usernameParameter("userid")
				.passwordParameter("password")
			.and()
				.logout().logoutUrl("/logout");
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userService).passwordEncoder(userService.passwordEncoder());
	}

}
