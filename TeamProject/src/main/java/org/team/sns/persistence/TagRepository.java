package org.team.sns.persistence;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.team.sns.domain.Tag;
/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.08.30
 * @version 2018.08.30
 *
 */
public interface TagRepository extends CrudRepository<Tag, String>,TagRepositoryCustom{
	public List<Tag> findByHashTagStartingWith(String keyword);

}
