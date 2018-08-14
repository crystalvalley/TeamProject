package org.team.sns.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.team.sns.domain.Member;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.vo.RestMsgObject;
/**
 * @author ParkHyeokJoon
 * @since 2018.08.14
 * @version 2018.08.14
 *
 */
@RestController
@CrossOrigin(origins="*")
public class AccountRestController {
	@Autowired
	MemberRepository memberrepo;

	@GetMapping("/idCheck")
	public RestMsgObject idCheck(String _id) {
		RestMsgObject rmo = new RestMsgObject();
		if (memberrepo.existsById(_id)) {
			rmo.setMsg("fail");
			return rmo;
		} else {
			rmo.setMsg("success");
			return rmo;			
		}
	}

	@GetMapping("/delete")
	public void delete() {
		memberrepo.deleteById("PHJ");
	}

	@GetMapping("/search")
	public String search() {
		String result = "";
		result = memberrepo.getNickname("test");
		return result;
	}

}
