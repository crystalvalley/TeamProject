package org.team.sns.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author ParkHyeokJoon
 * @since 2018.08.14
 * @version 2018.08.21
 */
@Controller
@CrossOrigin(origins="*")
public class BaseController {

	@GetMapping("/")
	public String goHome() {
		System.out.println("??");
		return "index";
	}
	@GetMapping("/signup")
	public String signup() {
		return "index";
	}
	@GetMapping("/signin")
	public String signin() {
		System.out.println("??");
		return "index";
	}
}