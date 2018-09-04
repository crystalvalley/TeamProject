package org.team.sns.persistence;

import org.springframework.data.repository.CrudRepository;
import org.team.sns.domain.Networking;

public interface NetworkRepository extends CrudRepository<Networking, Integer>, NetworRepositoryCustom{

}
