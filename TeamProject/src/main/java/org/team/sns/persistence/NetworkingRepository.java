package org.team.sns.persistence;

import org.springframework.data.repository.CrudRepository;
import org.team.sns.domain.Networking;
import org.team.sns.domain.NetworkingPK;

public interface NetworkingRepository extends CrudRepository<Networking, NetworkingPK>,NetworkingRepositoryCustom{

}
