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
import org.team.sns.domain.Board;
import org.team.sns.domain.Member;
import org.team.sns.domain.Reply;
import org.team.sns.persistence.BoardRepository;
import org.team.sns.persistence.BoardRepositoryImpl;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.persistence.ReplyRepository;
import org.team.sns.persistence.ReplyRepositorympl;
import org.team.sns.service.DropboxService;
import org.team.sns.service.MemberServiceImpl;
import org.team.sns.service.SecurityUserServiceImpl;
import org.team.sns.vo.RestMsgObject;

import java.util.List;

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
	private MemberServiceImpl ms;
	@Autowired
	private SecurityUserServiceImpl secUserService;
	@Autowired
	private DropboxService ds;
	@Autowired
	private BoardRepository br;
	@Autowired
	private BoardRepositoryImpl bs;
	@Autowired
	private ReplyRepository rr;

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
		System.out.println(member);
		secUserService.createUser(member);
		ms.signup(member);
	}

	@PostMapping("/loginCheck")
	public Member loginCheck(Principal principal) {
		Member member;
		if (principal != null) {
			member = mr.findById("testid").get();
		} else {
			return null;
		}
		return member;
	}

	@PostMapping("/uploadProfile")
	public String uploadProfile(@RequestParam("upload") MultipartFile upload, Principal principal) throws Exception {
		System.out.println("test");
		return ds.fileUpload(upload, "testid");
	}

	@PostMapping("/UpdateUser")
	public Member UpdateUser(String name, String pw, Principal principal) {
		Member member = new Member();
		System.out.println("들어온다" + name + pw);
		return member;
	}

	@PostMapping("/updatauser")
	public Member updatauser(String chepw, Member member, Principal principal) {
		//System.out.println("들어온다2222" + member);
		Member me = mr.findById(member.getId()).get();
		// System.out.println("가져온거" + me);
		if (member.getUsername() != null) {
			me.setUsername(member.getUsername());
			//System.out.println("들어온다1");
		} else if (member.getUsername() == null) {
			me.setUsername(me.getUsername());
			//System.out.println("들어온다2");
		}

		if (member.getPassword() != null) {
			me.setPassword(member.getPassword());
			//System.out.println("들어온다3");
		} else if (member.getPassword() == null) {
			me.setPassword(me.getPassword());
			//System.out.println("들어온다4");
		}
		//System.out.println("뭐가 없는거지" +me);
		secUserService.createUser(me);
		//System.out.println("들어온다5" + me);
		mr.save(me);
		System.out.println("수정됨><" + me);
		return me;
	}

	@PostMapping("/saveReply")
	public Reply saveReply(int cardnum, String replyContent, Principal principal) {
		// System.out.println("댓글 들어옴" + replyContent);
		Reply reply = new Reply();
		Member member = new Member();
		System.out.println("리플저장" + cardnum + "," + replyContent + ",");
		System.out.println("리플저장하기 들어옴" + "testid");
		member = mr.findById("testid").get();
		reply.setContent(replyContent);
		reply.setWriter(member);
		// System.out.println(cardnum);
		Board board = br.findById(cardnum).get();
		System.out.println(board);
		reply.setBoard(board);
		reply.setOrderPosition("0");
		// reply.setDepth(reply);
		rr.save(reply);
		System.out.println(reply);
		// 리플라이 저장하기
		return reply;
	}

	@GetMapping("/getByCardReply")
	public List<Reply> getByCardReply(int cardnum, Principal principal) {
		System.out.println("리플 불러오기들어온다" + cardnum);
		// rr.findById();
		List<Reply> result = rr.getReplysByBoardId(cardnum);

		// 널 오류 뜨는듯
		if (result == null) {
			Reply reply = new Reply();
			reply.setContent("댓글이 없습니다");
			result.add(reply);
			return result;
		}

		System.out.println("잘불러와짐" + result.toString());
		return result;
	}

	@PostMapping("/selectUsername")
	public String selectUsername(Principal principal) {
		Member member = new Member();
		member = mr.findById("testid").get();
		System.out.println("유저이름찾기" + member.getUsername());
		return member.getUsername();
	}
}
