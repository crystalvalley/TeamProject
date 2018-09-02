package org.team.sns.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.team.sns.service.ListServiceImpl;

/**
 * 
 * @author ParkHyeokJoon
 * @Since 18.08.31
 * @version 18.08.31
 *
 */

@RestController
@RequestMapping(value="/lists")
public class ListControlController {
	@Autowired
	ListServiceImpl ls;
	
	
	@GetMapping("/getListNames")
	public List<String> getListNames(Principal principal){
		return ls.getListNames(principal.getName());		
	}

}
