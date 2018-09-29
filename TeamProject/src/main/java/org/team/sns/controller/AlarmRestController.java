package org.team.sns.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
@RequestMapping(value = "/alarms")
public class AlarmRestController {

	@Autowired
	AlarmRepository ar;

	@GetMapping("/requestAlarms")
	public List<Alarm> requestAlarms(Principal principal) {
		System.out.println("알람받아오기 들어");
		List<Alarm> list = ar.requestAlarms("testid");
		System.out.println("알람리스트 :" + list);
		return list;
	}
}
