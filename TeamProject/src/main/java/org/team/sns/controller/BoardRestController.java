package org.team.sns.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.team.sns.domain.Board;
import org.team.sns.persistence.BoardRepository;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.vo.Datas;
import org.team.sns.vo.Params;

/**
 * 
 * @author ParkHyeokJoon
 * @Since 18.08.17
 * @version 18.08.20
 *
 */

@RestController
@CrossOrigin(origins = "*")
public class BoardRestController {
	@Autowired
	BoardRepository br;
	@Autowired
	MemberRepository mr;

	@PostMapping("/boards/getBoard")
	public List<Board> test(Params params,  Datas datas) {
		System.out.println("???");
		System.out.println(params);
		System.out.println(datas);
		return br.getBoardsByUserId("testid");
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
	public void writeBoard(Board board,String writerId) {
		System.out.println(board);
		System.out.println(writerId);
		board.setWriter(mr.findById(writerId).get());
		br.save(board);
	}

}
