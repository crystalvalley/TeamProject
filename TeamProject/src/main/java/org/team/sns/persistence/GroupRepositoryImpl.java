package org.team.sns.persistence;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.Group;

public class GroupRepositoryImpl  extends QuerydslRepositorySupport implements GroupRepositoryCustom{

	public GroupRepositoryImpl() {
		super(Group.class);
		// TODO Auto-generated constructor stub
	}



}
