package org.team.sns.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.team.sns.service.ListServiceImpl;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 
 * @author ParkHyeokJoon
 * @Since 18.08.31
 * @version 18.08.31
 *
 */

@RestController
@RequestMapping(value="/lists")
@CrossOrigin(origins = "*")
public class ListControlController {
	@Autowired
	ListServiceImpl ls;
	
	
	@GetMapping("/getListNames")
	public List<String> getListNames(Principal principal){
		// return ls.getListNames(principal.getName());		
		return ls.getListNames("testid");
	}
	
	@PostMapping("/setListOrder")
	public void setListOrder(Principal principal,@RequestBody String names) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		Map<String,ArrayList<String>> map = new HashMap<>();
		map = mapper.readValue(names, new TypeReference<Map<String,ArrayList<String>>>(){});
		ls.setListOrder(map.get("names"), "testid");
	}

}
