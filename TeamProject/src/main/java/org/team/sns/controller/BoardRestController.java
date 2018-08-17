package org.team.sns.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.team.sns.domain.Board;
import org.team.sns.persistence.BoardRepository;
import org.team.sns.vo.Datas;
import org.team.sns.vo.Params;

/**
 * 
 * @author ParkHyeokJoon
 * @Since 18.08.17
 * @version 18.08.17
 *
 */

@RestController
@CrossOrigin(origins = "*")
public class BoardRestController {
	@Autowired
	BoardRepository br;

	@PostMapping("/getBoard")
	public List<Board> test( Params params,  Datas datas) {
		System.out.println(params);
		System.out.println(datas);
		return br.getBoardsByUserId("administrator");
	}

}
