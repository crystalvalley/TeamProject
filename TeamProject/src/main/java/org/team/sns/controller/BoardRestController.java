package org.team.sns.controller;

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
import org.team.sns.domain.Board;
import org.team.sns.domain.Tag;
import org.team.sns.persistence.BoardRepository;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.service.AlarmService;
import org.team.sns.service.BoardService;
import org.team.sns.vo.BoardSearchCondition;
import org.team.sns.vo.Datas;
import org.team.sns.service.AlarmService;
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
	AlarmService as;

	@PostMapping("/getBoard")
	public List<Board> test(BoardSearchCondition params, Datas datas) {
		return bs.getBoard(params);
	}

	@GetMapping("/getByListName")
	public List<Board> getByListName(String listName, Principal principal, int page) {
		// return bs.getBoardByListName(listName,"testid");
		return bs.getBoardByListName(listName, "testid", page);
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
	   public void writeBoard(Board board, Principal principal,MultipartFile[] image) throws Exception {
	      // board.setWriter(mr.findById("testid").get());
	      board.setWriter(mr.findById(principal.getName()).get());
	      bs.saveBoard(board);
	      bs.setBoardImage(board, image);
	      as.savementionAlarms(board, principal);
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
		return bs.getEmotions(boardId, "testid");
	}

	@GetMapping("/addEmotion")
	public String setEmotion(int emotionType, int boardId, Principal principal) {
		bs.addEmotion(boardId, emotionType, "testid");
		return "success";
	}

	@GetMapping("/search")
	public List<Board> getBoardbySearch(String keyword, int page, Principal principal) {
		System.out.println(keyword);
		if (keyword.equals("")) {
			return null;
		}
		return bs.getBoardBySearchKeyword(keyword, page, "testid");
	}

	@GetMapping("/getFavorites")
	public List<Integer> getFavorites(Principal principal) {
		return bs.getFavorites("testid");
	}

	@GetMapping("/setFavorites")
	public void setFavorites(Principal principal, int id) {
		bs.setFavorites("testid", id);
	}

	@GetMapping("/getById")

	public List<Board> getById(Principal principal){
	List<Board> list = br.getBoardsByUserId("testid");
	System.out.println("들어왔따.");
	System.out.println(list);
	return list;

	
}
}
