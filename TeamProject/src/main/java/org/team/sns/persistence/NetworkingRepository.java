package org.team.sns.persistence;

import org.springframework.data.repository.CrudRepository;
import org.team.sns.domain.Networking;

public interface NetworkingRepository extends CrudRepository<Networking, Integer>,NetworkingRepositoryCustom{


}
