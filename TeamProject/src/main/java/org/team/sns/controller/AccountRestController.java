package org.team.sns.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.team.sns.domain.Member;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.vo.RestMsgObject;

/**
 * @author ParkHyeokJoon
 * @since 2018.08.14
 * @version 2018.08.21
 *
 */
@RestController
@CrossOrigin(origins = "*")
public class AccountRestController {
	@Autowired
	MemberRepository memberrepo;
	@Autowired
	AuthenticationManager authenticationManager;
	

	@PostMapping("/login")
	public RestMsgObject test(String userid, String password, HttpServletRequest request) {
		HttpSession sess = request.getSession();
		
		RestMsgObject msg = new RestMsgObject();
		// 로그인 처리를 위해 userid와 password로 값을 찾아야 함
		if (memberrepo.existsById(userid)) {
			if (memberrepo.findById(userid).get().getPassword().equals(password)) {
				sess.setAttribute("userid", userid);
				msg.setMsg("success");
			} else {
				msg.setMsg("fail");
				msg.setDescription("비밀번호가 틀렸습니다.");
			}
		} else {
			msg.setMsg("fail");
			msg.setDescription("ID가 없습니다.");
		}
		return msg;
	}
	
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

	@PostMapping("/signup")
	public void signUp(Member member) {
		String pw = member.getPassword();
		// 비밀번호를 암호화 하기 위해
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		// 인코딩해서 저장
		member.setPassword(encoder.encode(pw));
		// 이미 유효성처리가 끝난 상태이므로 바로 저장
		memberrepo.save(member);
	}


	@PostMapping("/loginCheck")
	public RestMsgObject loginCheck(HttpServletRequest request) {
		HttpSession sess = request.getSession(false);
		System.out.println("일단 여긴 들어오냐");
		// 로그인이 되있다면 userid반환
		RestMsgObject msg = new RestMsgObject();
		if (sess.getAttribute("userid") != null) {
			System.out.println(sess.getAttribute("userid").toString());
			System.out.println(sess.getAttribute("userid").toString());
			System.out.println(sess.getAttribute("userid").toString());
			System.out.println(sess.getAttribute("userid").toString());
			System.out.println(sess.getAttribute("userid").toString());
			System.out.println(sess.getAttribute("userid").toString());
			System.out.println(sess.getAttribute("userid").toString());
			System.out.println(sess.getAttribute("userid").toString());
			msg.setMsg(sess.getAttribute("userid").toString());
		} else
			msg.setMsg("fail");
		return msg;
	}

}
