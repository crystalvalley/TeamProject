package org.team.sns.persistence;

import org.springframework.data.repository.CrudRepository;
import org.team.sns.domain.Photo;

/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.09.17
 * @version 2018.09.17
 *
 */
public interface PhotoRepository extends CrudRepository<Photo, Integer>,PhotoRepositoryCustom{

}
