package org.team.sns.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.ProductStrategy;
import org.team.sns.domain.QProductStrategy;

import com.querydsl.jpa.JPQLQuery;

public class ProductStrategyRepositoryImpl extends QuerydslRepositorySupport implements ProductStrategyRepositoryCustom{

	public ProductStrategyRepositoryImpl() {
		super(ProductStrategy.class);
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<ProductStrategy> getPStrategies(String listname) {
		// TODO Auto-generated method stub
		QProductStrategy pstr = QProductStrategy.productStrategy;
		JPQLQuery<ProductStrategy> query = from(pstr);
		query.where(pstr.ownedCl.listName.eq(listname));
		return query.fetch();
	}

}
