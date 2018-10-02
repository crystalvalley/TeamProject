package org.team.sns.persistence;

import java.util.List;

import org.team.sns.domain.ProductStrategy;

public interface ProductStrategyRepositoryCustom {
	public List<ProductStrategy> getPStrategies(String listname);
}
