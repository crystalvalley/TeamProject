package org.team.sns.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.team.sns.domain.Member;
import org.team.sns.domain.SecurityUser;

public interface SecurityUserService extends UserDetailsService {
	public SecurityUser readUser(String username);

	public void createUser(Member member);

	public void deleteUser(String username);

	public PasswordEncoder passwordEncoder();

}
