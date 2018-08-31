package org.team.sns.persistence;

import org.springframework.data.repository.CrudRepository;
import org.team.sns.domain.CustomList;
import org.team.sns.domain.CustomListPK;
import org.team.sns.domain.Member;

public interface CustomListRepository extends CrudRepository<CustomList, CustomListPK>,CustomListRepositoryCustom{
}
