package org.team.sns.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.Member;
import org.team.sns.domain.Networking;
import org.team.sns.domain.QNetworking;

import com.querydsl.jpa.JPQLQuery;
/**
 * 
 * @author ParkHyeokjoon
 * @since 2018.09.08
 * @version 2018.09.08
 *
 */
public class NetworkingRepositoryImpl extends QuerydslRepositorySupport implements NetworkingRepositoryCustom{

	public NetworkingRepositoryImpl() {
		super(Networking.class);
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<Member> getFriend(String memberid) {
		// TODO Auto-generated method stub
		QNetworking net = QNetworking.networking;
		JPQLQuery<Member> query = from(net).select(net.target);
		query.where(net.member.id.eq(memberid));
		query.where(net.type.eq("Friend"));
		return query.fetch();
	}

	@Override
	public List<String> getFriendRequests(String memberid) {
		// TODO Auto-generated method stub
		QNetworking net = QNetworking.networking;
		JPQLQuery<String> query = from(net).select(net.target.id);
		query.where(net.type.eq("FriendRequest"));
		query.where(net.member.id.eq(memberid));
		return query.fetch();
	}

}
