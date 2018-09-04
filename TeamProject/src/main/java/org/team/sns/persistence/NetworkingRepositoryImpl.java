package org.team.sns.persistence;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.Networking;

public class NetworkingRepositoryImpl extends QuerydslRepositorySupport implements NetworkingRepositoryCustom{

	public NetworkingRepositoryImpl() {
		super(Networking.class);
		// TODO Auto-generated constructor stub
	}

}
