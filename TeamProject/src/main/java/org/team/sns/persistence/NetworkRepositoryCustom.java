package org.team.sns.persistence;

import org.team.sns.domain.Networking;

public interface NetworkRepositoryCustom {
	public Networking getByMemberId(String memberid);
}
