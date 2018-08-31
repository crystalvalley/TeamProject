package org.team.sns.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.CustomList;
import org.team.sns.domain.QCustomList;

import com.querydsl.jpa.JPQLQuery;

public class CustomRepositoryImpl extends QuerydslRepositorySupport implements CustomListRepositoryCustom{
	
	
	
	public CustomRepositoryImpl() {
		super(CustomList.class);
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<String> getListNames(String userid) {
		// TODO Auto-generated method stub
		QCustomList qcList = QCustomList.customList;
		JPQLQuery<String> query = from(qcList).select(qcList.listName);
		return null;
	}

}
