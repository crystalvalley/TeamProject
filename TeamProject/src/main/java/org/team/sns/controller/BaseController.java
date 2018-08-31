package org.team.sns.controller;

import java.security.Principal;

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
	public String index(Principal principal) {
		//System.out.println(principal.getName());
		return "index";
	}
	@GetMapping("/home")
	public String goHome(Principal principal) {
		//System.out.println(principal.getName());
		return "redirect:/";
	}
	@GetMapping("/signup")
	public String signup() {
		return "index";
	}
	@GetMapping("/signin")
	public String signin() {
		//System.out.println("??");
		return "index";
	}
	@GetMapping("userUpdate")
	public String userUpdate() {
		System.out.println("수정페이지전환");
		return "index";
	}
}