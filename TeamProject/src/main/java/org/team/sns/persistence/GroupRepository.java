package org.team.sns.persistence;

import org.springframework.data.repository.CrudRepository;
import org.team.sns.domain.Board;
import org.team.sns.domain.Group;
/**
 * @author JoonsungGil
 * @since 2018.09.06
 * @version 2018.09.06
 *
 */
public interface GroupRepository extends CrudRepository<Group, String>,GroupRepositoryCustom{

	

}
