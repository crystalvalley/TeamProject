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
	@Autowired
	private SocketService ss;

	@Override
	public void signup(Member member) {
		// TODO Auto-generated method stub
		// 이미 유효성 검사는 처리 됬으므로
		setInitialBoard(member,"Base");
		setInitialBoard(member,"Follow");
		setInitialBoard(member,"SearchField");
		setInitialBoard(member,"Favorites");
		setInitialBoard(member,"Friend");
		mr.save(member);
	}

	@Override
	public void newCustomList() {
		// TODO Auto-generated method stub
		
	}
	public void setInitialBoard(Member member,String listName) {
		// TODO Auto-generated method stub
		// Base 테이블
		CustomList initList = new CustomList();
		ProductStrategy initPstr = new ProductStrategy();
		Strategy initStr = new Strategy();
		initList.setOwner(member);
		initList.setListName(listName);
		clr.save(initList);		
		initPstr.setOwnedCl(initList);
		pstr.save(initPstr);
		initStr.setType(listName);
		initStr.setOwned(initPstr);	
		str.save(initStr);
	}

	@Override
	public void setProfileImg(String path,Member member) {
		// TODO Auto-generated method stub
		member.setProfileImg(path);
		mr.save(member);
	}

}
