package org.team.sns.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
@CrossOrigin(origins = "*")
public class ListControlController {
	@Autowired
	ListServiceImpl ls;
	
	
	@GetMapping("/getListNames")
	public List<String> getListNames(Principal principal){
		// return ls.getListNames(principal.getName());		
		return ls.getListNames("testid");
	}
	
	@PostMapping("/setListOrder")
	public void setListOrder(Principal principal, ArrayList<String> names) {
		System.out.println("==============================");
		System.out.println(names);
		System.out.println("==============================");
	}

}
