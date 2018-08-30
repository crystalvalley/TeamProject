package org.team.sns.persistence;

import org.springframework.data.repository.CrudRepository;
import org.team.sns.domain.Tag;
/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.08.30
 * @version 2018.08.30
 *
 */
public interface TagRepository extends CrudRepository<Tag, String>{

}
