package org.team.sns.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.team.sns.domain.Alarm;
import org.team.sns.persistence.AlarmRepository;

/**
 * 
 * @author GilJoonsung
 * @Since 18.09.10
 * @version 18.09.10
 *
 */


@RestController
@RequestMapping(value="/alarms")
public class AlarmRestController {
	
	@Autowired
	AlarmRepository ar;
	
	
	@PostMapping("/setAlarms")
	public boolean setAlarms(Alarm alarm) {
		
		System.out.println("들어왔습니다.");
		return true;
	}
	
	
	
	
}
