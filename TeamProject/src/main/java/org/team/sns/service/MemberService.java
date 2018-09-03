package org.team.sns.service;

import org.team.sns.domain.Member;

public interface MemberService {
	public void signup(Member member);
	public void newCustomList();
	public void setProfileImg(String path,Member member);
}
