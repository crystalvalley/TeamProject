package org.team.sns.service;

import java.util.List;

import org.team.sns.domain.Member;

/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.09.08
 * @version 2018.09.08
 */

public interface NetworkService {
	public void friendRequest(String memberid,String target);
	public void acceptFriend(String memberid,String target);
	public void addFollow(String memberid,String target);
	public void delFollow(String memberid,String target);
	public void delFriend(String memberid,String target);
	public List<Member> getFriends(String memberid);
	public List<String> getFriendsRequest(String memberid);

}
