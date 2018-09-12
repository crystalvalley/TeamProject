package org.team.sns.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.team.sns.persistence.AlarmRepository;

/**
 * @author Gil Joonsung
 * @since 2018.09.10
 * @version 2018.09.10
 *
 */

@Service
public class AlarmServiceImpl implements AlarmService{
	
	@Autowired
	AlarmRepository ar;
}
