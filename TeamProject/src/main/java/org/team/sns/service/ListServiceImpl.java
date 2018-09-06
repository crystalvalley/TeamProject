package org.team.sns.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.team.sns.domain.CustomList;
import org.team.sns.domain.CustomListPK;
import org.team.sns.domain.ProductStrategy;
import org.team.sns.domain.Strategy;
import org.team.sns.persistence.CustomListRepository;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.persistence.ProductStrategyRepository;
import org.team.sns.persistence.StrategyRepository;

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
	@Autowired
	ProductStrategyRepository psr;
	@Autowired
	StrategyRepository str;

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

	@Override
	public void addList(String name, String userid, List<List<HashMap<String, String>>> condition) {
		// TODO Auto-generated method stub
		CustomList newcl = new CustomList();
		newcl.setOwner(mr.findById(userid).get());
		newcl.setListName(name);
		clr.save(newcl);
		for(List<HashMap<String,String>> pcon : condition) {
			ProductStrategy newps = new ProductStrategy();
			newps.setOwnedCl(newcl);
			psr.save(newps);
			for(HashMap<String,String> con : pcon) {
				Strategy newstr = new Strategy();
				newstr.setOwned(newps);
				newstr.setType(con.get("strategy"));
				newstr.setTargets(con.get("target"));
				str.save(newstr);
			}
		}
	}

	@Override
	public void updateList(String name, String userid, List<List<HashMap<String, String>>> condition) {
		// TODO Auto-generated method stub
		CustomListPK clp = new CustomListPK();
		clp.setListName(name);
		clp.setOwner(userid);
		clr.deleteById(clp);
		CustomList newcl = new CustomList();
		newcl.setOwner(mr.findById(userid).get());
		newcl.setListName(name);
		clr.save(newcl);
		for(List<HashMap<String,String>> pcon : condition) {
			ProductStrategy newps = new ProductStrategy();
			newps.setOwnedCl(newcl);
			psr.save(newps);
			for(HashMap<String,String> con : pcon) {
				Strategy newstr = new Strategy();
				newstr.setOwned(newps);
				newstr.setType(con.get("strategy"));
				newstr.setTargets(con.get("target"));
				str.save(newstr);
			}
		}
		
	}

}
