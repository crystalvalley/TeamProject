package org.team.sns.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.team.sns.persistence.AlarmRepository;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.service.AlarmServiceImpl;

@RestController
@CrossOrigin
@RequestMapping(value="/alarms")
public class AlarmRestController {
	@Autowired
	AlarmServiceImpl as;
	@Autowired
	AlarmRepository ar;
	@Autowired
	MemberRepository mr;
	
	
}
