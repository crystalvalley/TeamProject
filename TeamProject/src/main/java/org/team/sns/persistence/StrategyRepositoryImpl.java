package org.team.sns.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.QStrategy;
import org.team.sns.domain.Strategy;

import com.querydsl.jpa.JPQLQuery;

/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.10.02
 * @version 2018.10.02
 *
 */
public class StrategyRepositoryImpl extends QuerydslRepositorySupport implements StrategyRepositoryCustom {

	public StrategyRepositoryImpl() {
		super(Strategy.class);
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<Strategy> getTypeandTargets(int pstrId) {
		// TODO Auto-generated method stub
		QStrategy str = QStrategy.strategy;
		JPQLQuery<Strategy> query = from(str);
		query.where(str.owned.id.eq(pstrId));
		return query.fetch();
	}
}
