package org.team.sns.persistence;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.Member;

/**
 * 
 * @author ParkHyeokjoon
 * @since 18.08.12
 * @version 18.08.12
 *
 */
public class MemberRepositoryImpl extends QuerydslRepositorySupport implements MemberRepositoryCustom {

	public MemberRepositoryImpl() {
		super(Member.class);
		// TODO Auto-generated constructor stub
	}


}
