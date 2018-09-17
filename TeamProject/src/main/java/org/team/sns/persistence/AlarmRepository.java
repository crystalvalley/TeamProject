package org.team.sns.persistence;

import org.springframework.data.repository.CrudRepository;
import org.team.sns.domain.Alarm;


/**
 * 
 * @author Gil Joonsung
 * @Since 18.09.10
 * @version 18.09.10
 *
 */

public interface AlarmRepository extends CrudRepository<Alarm, Integer>, AlarmRepositoryCustom{

}
