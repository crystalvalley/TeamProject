package org.team.sns.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.team.sns.domain.Member;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.service.DropboxService;
import org.team.sns.service.SecurityUserServiceImpl;
import org.team.sns.vo.RestMsgObject;

/**
 * @author ParkHyeokJoon
 * @since 2018.08.14
 * @version 2018.08.31
 *
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/account")
public class AccountRestController {
	@Autowired
	private MemberRepository mr;
	@Autowired
	private SecurityUserServiceImpl secUserService;
	@Autowired
	private DropboxService ds;

	@GetMapping("/idCheck")
	public RestMsgObject idCheck(String _id) {
		RestMsgObject rmo = new RestMsgObject();
		if (mr.existsById(_id)) {
			rmo.setMsg("fail");
			return rmo;
		} else {
			rmo.setMsg("success");
			return rmo;
		}
	}

	@GetMapping("/delete")
	public void delete() {
		mr.deleteById("PHJ");
	}

	@GetMapping("/search")
	public String search() {
		String result = "";
		result = mr.getNickname("test");
		return result;
	}

	@PostMapping("/signup")
	public void signUp(Member member) {
		secUserService.createUser(member);
	}

	@PostMapping("/loginCheck")
	public RestMsgObject loginCheck(Principal principal) {
		RestMsgObject msg = new RestMsgObject();
		if (principal != null) {
			msg.setMsg(principal.getName());
		} else {
			msg.setMsg("Not Logined");
		}
		return msg;
	}

	@PostMapping("/uploadProfile")
	public String uploadProfile(@RequestParam("upload") MultipartFile upload) throws Exception {
		System.out.println("test");
		return ds.fileUpload(upload);
	}
}
