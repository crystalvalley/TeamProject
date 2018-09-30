package org.team.sns.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.team.sns.domain.Alarm;
import org.team.sns.domain.Board;
import org.team.sns.domain.Member;
import org.team.sns.domain.Tag;
import org.team.sns.persistence.AlarmRepository;
import org.team.sns.persistence.BoardRepository;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.service.AlarmService;
import org.team.sns.service.BoardService;
import org.team.sns.service.SocketService;
import org.team.sns.vo.BoardSearchCondition;
import org.team.sns.vo.Datas;

/**
 * 
 * @author ParkHyeokJoon
 * @Since 18.08.17
 * @version 18.08.31
 *
 */

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/boards")
public class BoardRestController {
	@Autowired
	BoardService bs;
	@Autowired
	BoardRepository br;
	@Autowired
	MemberRepository mr;
	@Autowired
	AlarmRepository ar;
	@Autowired
	SocketService ss;

	@Autowired
	AlarmService as;

	@PostMapping("/getBoard")
	public List<Board> test(BoardSearchCondition params, Datas datas) {
		return bs.getBoard(params);
	}

	@GetMapping("/getByListName")
	public List<Board> getByListName(String listName, Principal principal, int page) {
		// return bs.getBoardByListName(listName,principal.getName());
		return bs.getBoardByListName(listName, principal.getName(), page);
	}

	@GetMapping("/view")
	public Map<String, Object> sendBoard(String type, int num) {
		HashMap<String, Object> result = new HashMap<>();
		Board board = br.findById(num).get();
		result.put("content", board);
		result.put("writer", board.getWriter().getId());
		result.put("image", board.getPhotos());
		return result;
	}

	@PostMapping("/writeBoard")
	public void writeBoard(Board board, Principal principal, MultipartFile[] image) throws Exception {
		// board.setWriter(mr.findById(principal.getName()).get());
		board.setWriter(mr.findById(principal.getName()).get());
		bs.saveBoard(board);
		bs.setBoardImage(board, image);
		as.savementionAlarms(board, principal.getName());
	}

	@GetMapping("/checkTag")
	public List<Tag> checkTag(String hashTag) {
		return bs.getTagList(hashTag);
	}

	@GetMapping("/checkMention")
	public List<String> checkMention(String mention) {
		System.out.println(mention);
		return bs.getMentionList(mention);
	}

	@GetMapping("/getEmotion")
	public List<Integer> getEmotion(int boardId, Principal principal) {
		return bs.getEmotions(boardId, principal.getName());
	}

	@GetMapping("/addEmotion")
	public String setEmotion(int emotionType, int boardId, Principal principal) {
		bs.addEmotion(boardId, emotionType, principal.getName());
		return "success";
	}

	@GetMapping("/search")
	public List<Board> getBoardbySearch(String keyword, int page, Principal principal) {
		System.out.println(keyword);
		if (keyword.equals("")) {
			return null;
		}
		return bs.getBoardBySearchKeyword(keyword, page, principal.getName());
	}

	@GetMapping("/getFavorites")
	public List<Integer> getFavorites(Principal principal) {
		return bs.getFavorites(principal.getName());
	}

	@GetMapping("/setFavorites")
	public void setFavorites(Principal principal, int id) {
		bs.setFavorites(principal.getName(), id);
	}

	@GetMapping("/getByBoardNum")
	public Board getByBoardNum(Principal principal,int boardNum, String alarmId) {
		System.out.println("보드 가지러 들어왔나?");
		System.out.println("integer:"+boardNum);
		Board board = br.findById(boardNum).get();
		System.out.println(board);
		System.out.println("alarmId:"+alarmId);
		Alarm arm = ar.findById(Integer.parseInt(alarmId)).get();
		arm.setChecked(true);
		ar.save(arm);
		try {
			ss.refreshAlarm(arm.getReceiver_id().getId());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return board;
	}
	
	@GetMapping("/getPersonalPage")
	public Map<String,Object> getPersonalPage(String target){
		System.out.println(target);
		HashMap<String, Object> result = new HashMap<>();	
		Member targetInfo = mr.findById(target).get();
		List<Board> list = br.getBoardsByUserId(target);
		result.put("cards", list);
		result.put("target", targetInfo);
		return result;
	}
}
