package org.team.sns.persistence;

import java.util.List;

import org.team.sns.domain.Member;

/**
 * 
 * @author ParkHyeokjoon
 * @since 18.08.12
 * @version 18.08.12
 *
 */
public interface MemberRepositoryCustom {
	public String getNickname(String _id);
	public List<String> getIdsForMention(String mention);
	public List<Member> getAllUsers();
}
