package org.team.sns.persistence;

import org.springframework.data.repository.CrudRepository;
import org.team.sns.domain.Board;
/**
 * 
 * @author ParkHyeokjoon
 * @since 18.08.12
 * @version 18.08.12
 *
 */
public interface BoardRepository extends CrudRepository<Board, Integer>,BoardRepositoryCustom{

}
