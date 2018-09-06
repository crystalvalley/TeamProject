package org.team.sns.persistence;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.Networking;
import org.team.sns.domain.QNetworking;

import com.querydsl.jpa.JPQLQuery;

public class NetworkRepositoryImpl extends QuerydslRepositorySupport  implements NetworkRepositoryCustom{

	public NetworkRepositoryImpl() {
		super(Networking.class);
		// TODO Auto-generated constructor stub
	}

	@Override
	public Networking getByMemberId(String memberid) {
		// TODO Auto-generated method stub
		QNetworking network = QNetworking.networking;
		JPQLQuery<Networking> query = from(network);
		query.select(network);
		query.where(network.member.id.eq(memberid));
		return query.fetchOne();
	}

}
