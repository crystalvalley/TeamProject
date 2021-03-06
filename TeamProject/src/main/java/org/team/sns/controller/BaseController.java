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
@CrossOrigin(origins = "*")
public class BaseController {

	@GetMapping("/")
	public String index(Principal principal) {
		// System.out.println("testid");
		return "index";
	}

	@GetMapping("/home")
	public String goHome(Principal principal) {
		// System.out.println("testid");
		return "redirect:/";
	}

	@GetMapping("/signup")
	public String signup() {
		return "index";
	}

	@GetMapping("/signin")
	public String signin() {
		// System.out.println("??");
		return "index";
	}

	@GetMapping("userUpdate")
	public String userUpdate() {
		System.out.println("수정페이지전환");
		return "index";
	}

	@GetMapping("/createGroup")
	public String createGroup() {
		// System.out.println("??");
		return "index";
	}
	@GetMapping("/Users")
	public String users() {
		// System.out.println("??");
		return "index";
	}

	@GetMapping("/test")
	public String test() {
		// System.out.println("??");
		return "index";
	}

	@GetMapping("/listControl")
	public String listControl() {
		// System.out.println("??");
		return "index";
	}

	@GetMapping("/AllFriends")
	public String AllFriends() {
		// System.out.println("??");
		return "index";
	}

	@GetMapping("/PersonalPage/*")
	public String personalPage() {
		// System.out.println("??");
		return "index";
	}

}