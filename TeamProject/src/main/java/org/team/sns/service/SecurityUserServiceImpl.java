package org.team.sns.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.team.sns.domain.Member;
import org.team.sns.domain.SecurityUser;
import org.team.sns.persistence.MemberRepository;

@Service
public class SecurityUserServiceImpl implements SecurityUserService {

	@Autowired
	MemberRepository mr;
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@Override
	public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		Member member = mr.findById(id).get();
		return new SecurityUser(member.getId(), member.getPassword(), member.getUsername());
	}

	@Override
	public SecurityUser readUser(String id) {
		// TODO Auto-generated method stub
		Member member = mr.findById(id).get();
		return new SecurityUser(member.getId(), member.getPassword(), member.getUsername());
	}

	@Override
	public void createUser(Member member) {
		// TODO Auto-generated method stub
		String pw = member.getPassword();
		member.setPassword(new BCryptPasswordEncoder().encode(pw));
		mr.save(member);
	}

	@Override
	public void deleteUser(String username) {
		// TODO Auto-generated method stub

	}

	@Override
	public PasswordEncoder passwordEncoder() {
		// TODO Auto-generated method stub
		return this.passwordEncoder;
	}

}
