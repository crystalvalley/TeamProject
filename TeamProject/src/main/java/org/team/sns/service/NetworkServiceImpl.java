package org.team.sns.service;

import java.io.IOException;
import java.util.ArrayList;
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
	@Autowired
	SocketService ss;
	
	@Override
	public void friendRequest(String memberid, String target) {
		// TODO Auto-generated method stub		
		// 상대에겐 친구요청 => 쌍방 follow면 친구
		addFollow(memberid,target);
		// 나는 follow
		Networking net2 = new Networking();
		net2.setMember(mr.findById(memberid).get());
		net2.setTarget(mr.findById(target).get());
		net2.setType("Follow");
		nr.save(net2);
		//acceptFriend(target,memberid);
	}

	@Override
	public void acceptFriend(String memberid, String target) {
		// TODO Auto-generated method stub
		// 먼저 자신한테 온 요청을 수정함
		// 그리고 자신도 친구목록에 추가
		// 준성 : 누군가가 먼저 요청했고 내가 받아들이면 친구로 저장하자.
		System.out.println("여긴 들어갔나?");
		Networking net = new Networking();
		net.setMember(mr.findById(memberid).get());
		net.setTarget(mr.findById(target).get());
		net.setType("Follow");
		nr.save(net);
		ArrayList<String> targets = new ArrayList<>();
		targets.add(memberid);
		targets.add(target);
		try {
			ss.sendSystemhMsg(targets, "network-reload", "network-reload",-1);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
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

	
	// 3.service에서 기능생성
	@Override
	public void delFriend(String memberid, String target) {
		// TODO Auto-generated method stub
		NetworkingPK npk = new NetworkingPK();
		npk.setMember(memberid);
		npk.setTarget(target);
		Networking net = nr.findById(npk).get();
		nr.delete(net);		
		ArrayList<String> targets = new ArrayList<>();
		targets.add(memberid);
		targets.add(target);
		try {
			ss.sendSystemhMsg(targets, "network-reload", "network-reload",-1);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
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

	@Override
	public List<Member> getFollowList(String memberid) {
		// TODO Auto-generated method stub
		List<Member>result = new ArrayList<>();
		result = nr.getFollow(memberid);
		return result;
	}
}
