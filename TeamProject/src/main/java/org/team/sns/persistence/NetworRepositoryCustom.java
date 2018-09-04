package org.team.sns.persistence;

import org.team.sns.domain.Networking;

public interface NetworRepositoryCustom {
	public Networking getByMemberId(String memberid);
}
