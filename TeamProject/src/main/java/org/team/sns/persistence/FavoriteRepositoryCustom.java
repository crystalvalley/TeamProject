package org.team.sns.persistence;

import java.util.List;

import org.team.sns.domain.Member;

public interface FavoriteRepositoryCustom {
	public List<Integer> getFavoriteIds(Member member);

}
