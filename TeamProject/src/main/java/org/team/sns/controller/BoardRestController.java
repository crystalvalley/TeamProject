package org.team.sns.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.team.sns.domain.Board;
import org.team.sns.domain.Tag;
import org.team.sns.persistence.BoardRepository;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.service.BoardServiceImpl;
import org.team.sns.vo.Datas;
import org.team.sns.vo.BoardSearchCondition;

/**
 * 
 * @author ParkHyeokJoon
 * @Since 18.08.17
 * @version 18.08.31
 *
 */

@RestController
@CrossOrigin(origins = "*")
public class BoardRestController {
	@Autowired
	BoardServiceImpl bs;
	@Autowired
	BoardRepository br;
	@Autowired
	MemberRepository mr;


	@PostMapping("/boards/getBoard")
	public List<Board> test(BoardSearchCondition params,  Datas datas) {		
		return bs.getBoard(params);
	}	
	@GetMapping("/boards/view")
	public Map<String,Object> sendBoard(String type, int num) {
		System.out.println(type);
		System.out.println(num);
		HashMap<String,Object> result = new HashMap<>();
		Board board = br.findById(num).get();
		result.put("content", board);
		result.put("writer", board.getWriter().getUsername());
		result.put("image", board.getPhotos());
		return result;
	}
	
	@PostMapping("/boards/writeBoard")
	public void writeBoard(Board board, Principal principal) {
		board.setWriter(mr.findById(principal.getName()).get());
		bs.saveBoard(board);
	}
	
	@GetMapping("/boards/checkTag")
	public List<Tag> checkTag(String hashTag) {
		return bs.getTagList(hashTag);		
	}
	@GetMapping("/boards/checkMention")
	public List<String> checkMention(String mention) {
		System.out.println(mention);
		return bs.getMentionList(mention);		
	}
}
