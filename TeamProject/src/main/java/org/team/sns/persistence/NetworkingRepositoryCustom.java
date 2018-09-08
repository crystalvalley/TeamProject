package org.team.sns.persistence;

import java.util.List;

import org.team.sns.domain.Member;

/**
 * 
 * @author ParkHyeokjoon
 * @since 2018.09.08
 * @version 2018.09.08
 *
 */
public interface NetworkingRepositoryCustom {
	public List<Member> getFriend(String memberid);
	public List<String> getFriendRequests(String memberid);
}
