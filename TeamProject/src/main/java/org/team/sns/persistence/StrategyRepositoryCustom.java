package org.team.sns.persistence;

import java.util.List;

import org.team.sns.domain.Strategy;

/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.10.02
 * @version 2018.10.02
 *
 */
public interface StrategyRepositoryCustom {
	public List<Strategy> getTypeandTargets(int pstrId );
}
