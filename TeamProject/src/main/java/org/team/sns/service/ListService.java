package org.team.sns.service;

import java.util.HashMap;
import java.util.List;

/**
 * 
 * @author ParkHyeokJoon
 * @Since 18.08.31
 * @version 18.08.31
 *
 */
public interface ListService {
	public List<String> getListNames(String userid);
	public void setListOrder(List<String> list, String memberid);
	public void addList(String name,String userid,List<List<HashMap<String,String>>> condition);
}
