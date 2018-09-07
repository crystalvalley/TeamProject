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
		// return ls.getListNames("testid");		
		return ls.getListNames("testid");
	}
	
	@PostMapping("/setListOrder")
	public void setListOrder(Principal principal,@RequestBody String names) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		Map<String,ArrayList<String>> map = new HashMap<>();
		map = mapper.readValue(names, new TypeReference<Map<String,ArrayList<String>>>(){});
		ls.setListOrder(map.get("names"), "testid");
	}
	
	@PostMapping("/addCustomList")
	public void addList(Principal principal,@RequestBody String body) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		Map<String,String> map = new HashMap<>();
		map = mapper.readValue(body, new TypeReference<Map<String,Object>>(){});
		// 먼저 이름을 분리
		String name = (String) map.get("name");
		// 그다음 조건을 분리
		List<List<HashMap<String,String>>> bigCondition = 
				mapper.readValue(map.get("lists"), new TypeReference<List<List<HashMap<String,String>>>>(){});
		ls.addList(name, "testid", bigCondition);		
	}
	@PostMapping("/updateCustomList")
	public void updateList(Principal principal,@RequestBody String body) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		Map<String,String> map = new HashMap<>();
		map = mapper.readValue(body, new TypeReference<Map<String,Object>>(){});
		// 먼저 이름을 분리
		String name = (String) map.get("name");
		// 그다음 조건을 분리
		List<List<HashMap<String,String>>> bigCondition = 
				mapper.readValue(map.get("lists"), new TypeReference<List<List<HashMap<String,String>>>>(){});
		ls.updateList(name, "testid", bigCondition);		
	}
	@PostMapping("/refreshListOrder")
	public void refreshListOrder(Principal principal,@RequestBody String listNames) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		Map<String,ArrayList<String>> map = new HashMap<>();
		map = mapper.readValue(listNames, new TypeReference<Map<String,ArrayList<String>>>(){});
		ls.updateOrder(map.get("listNames"), "testid");
	}


}
