package org.team.sns.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.team.sns.domain.Member;
import org.team.sns.domain.Networking;
import org.team.sns.domain.NetworkingPK;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.persistence.NetworkingRepository;
/**
 * 
 * @author ParkHyeokjoon
 * @since 2018.09.08
 * @version 2018.09.08
 *
 */

@Service
public class NetworkServiceImpl implements NetworkService{
	@Autowired
	NetworkingRepository nr;
	@Autowired
	MemberRepository mr;
	
	@Override
	public void friendRequest(String memberid, String target) {
		// TODO Auto-generated method stub		
		Networking net = new Networking();
		net.setMember(mr.findById(memberid).get());
		net.setTarget(mr.findById(target).get());
		net.setType("FriendRequest");
		nr.save(net);
	}

	@Override
	public void acceptFriend(String memberid, String target) {
		// TODO Auto-generated method stub
		// 먼저 자신한테 온 요청을 수정함
		NetworkingPK npk = new NetworkingPK();
		npk.setMember(target);
		npk.setTarget(memberid);
		Networking net = nr.findById(npk).get();
		net.setType("Friend");
		nr.save(net);
		// 그리고 자신도 친구목록에 추가
		Networking net2 = new Networking();
		net2.setMember(mr.findById(memberid).get());
		net2.setTarget(mr.findById(target).get());
		net2.setType("Friend");
		nr.save(net2);
	}

	@Override
	public void addFollow(String memberid, String target) {
		// TODO Auto-generated method stub
		Networking net = new Networking();
		net.setMember(mr.findById(memberid).get());
		net.setTarget(mr.findById(target).get());
		net.setType("Follow");
		nr.save(net);
		
	}

	@Override
	public void delFollow(String memberid, String target) {
		// TODO Auto-generated method stub
		NetworkingPK npk = new NetworkingPK();
		npk.setMember(memberid);
		npk.setTarget(target);
		Networking net = nr.findById(npk).get();
		nr.delete(net);		
	}

	@Override
	public void delFriend(String memberid, String target) {
		// TODO Auto-generated method stub
		NetworkingPK npk = new NetworkingPK();
		npk.setMember(memberid);
		npk.setTarget(target);
		Networking net = nr.findById(npk).get();
		nr.delete(net);				
	}

	@Override
	public List<Member> getFriends(String memberid) {
		// TODO Auto-generated method stub
		return nr.getFriend(memberid);
	}

	@Override
	public List<Member> getFriendsRequest(String memberid) {
		// TODO Auto-generated method stub
		return nr.getFriendRequests(memberid);
	}

	@Override
	public void addBlock(String memberid, String target) {
		// TODO Auto-generated method stub
		Networking net = new Networking();
		net.setMember(mr.findById(memberid).get());
		net.setTarget(mr.findById(target).get());
		net.setType("Block");
		nr.save(net);		
	}
}
