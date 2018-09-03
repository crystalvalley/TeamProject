package org.team.sns.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.team.sns.domain.CustomList;
import org.team.sns.domain.Member;
import org.team.sns.domain.ProductStrategy;
import org.team.sns.domain.Strategy;
import org.team.sns.persistence.CustomListRepository;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.persistence.ProductStrategyRepository;
import org.team.sns.persistence.StrategyRepository;

/**
 * @author ParkHyeokJoon
 * @since 2018.08.31
 * @version 2018.08.31
 *
 */
@Service
public class MemberServiceImpl implements MemberService{
	@Autowired
	private MemberRepository mr;
	@Autowired
	private StrategyRepository str;
	@Autowired
	private CustomListRepository clr;
	@Autowired
	private ProductStrategyRepository pstr;

	@Override
	public void signup(Member member) {
		// TODO Auto-generated method stub
		// 이미 유효성 검사는 처리 됬으므로
		initialSetting(member);
		mr.save(member);
	}

	@Override
	public void newCustomList() {
		// TODO Auto-generated method stub
		
	}
	public CustomList initialSetting(Member member) {
		// TODO Auto-generated method stub
		CustomList initList = new CustomList();
		ProductStrategy initPstr = new ProductStrategy();
		Strategy initStr = new Strategy();
		initList.setOwner(member);
		initList.setListName("Base");
		clr.save(initList);		
		initPstr.setOwnedCl(initList);
		pstr.save(initPstr);
		initStr.setType("base");
		initStr.setOwned(initPstr);	
		str.save(initStr);
		return initList;		
	}

	@Override
	public void setProfileImg(String path,Member member) {
		// TODO Auto-generated method stub
		member.setProfileImg(path);
		mr.save(member);
	}

}
