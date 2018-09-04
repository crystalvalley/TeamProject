package org.team.sns.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.team.sns.domain.CustomList;
import org.team.sns.domain.CustomListPK;
import org.team.sns.persistence.CustomListRepository;
import org.team.sns.persistence.MemberRepository;

/**
 * 
 * @author ParkHyeokJoon
 * @Since 18.08.31
 * @version 18.08.31
 *
 */
@Service
public class ListServiceImpl implements ListService{
	@Autowired
	CustomListRepository clr;
	@Autowired
	MemberRepository mr;

	@Override
	public List<String> getListNames(String userid) {
		// TODO Auto-generated method stub
		return clr.getListNames(userid);
	}

	@Override
	public void setListOrder(List<String> list, String memberid) {
		// TODO Auto-generated method stub
		for(int i=0;i<list.size();i++) {
			CustomListPK cpk = new CustomListPK();
			cpk.setListName(list.get(i));
			cpk.setOwner(memberid);
			CustomList cList = clr.findById(cpk).get();
			cList.setCustomOrder(i);
			clr.save(cList);
		}
		
	}

}
