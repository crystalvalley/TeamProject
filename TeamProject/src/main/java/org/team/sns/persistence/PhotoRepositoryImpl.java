package org.team.sns.persistence;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.Photo;

public class PhotoRepositoryImpl extends QuerydslRepositorySupport implements PhotoRepositoryCustom{

	public PhotoRepositoryImpl() {
		super(Photo.class);
		// TODO Auto-generated constructor stub
	}

}
