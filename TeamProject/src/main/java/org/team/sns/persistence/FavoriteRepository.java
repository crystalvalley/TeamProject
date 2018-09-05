package org.team.sns.persistence;

import org.springframework.data.repository.CrudRepository;
import org.team.sns.domain.Board;
import org.team.sns.domain.Favorites;
import org.team.sns.domain.Member;
/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.09.05
 * @version 2018.09.05
 *
 */
public interface FavoriteRepository extends CrudRepository<Favorites, Integer>,FavoriteRepositoryCustom{
	public Favorites findByAdderAndBoard(Member adder, Board board);

}
