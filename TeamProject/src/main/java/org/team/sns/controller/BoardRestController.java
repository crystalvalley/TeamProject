package org.team.sns.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.team.sns.domain.Board;
import org.team.sns.persistence.BoardRepository;

@RestController
@CrossOrigin(origins="*")
public class BoardRestController {
	@Autowired
	BoardRepository br;
	@GetMapping("/getBoard")
	public List<Board> test(){
		return br.getBoardsByUserId("administrator");
	}

}
