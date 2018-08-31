package org.team.sns.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.Member;
import org.team.sns.domain.QMember;

import com.querydsl.jpa.JPQLQuery;

/**
 * 
 * @author ParkHyeokjoon
 * @since 18.08.12
 * @version 18.08.31
 *
 */
public class MemberRepositoryImpl extends QuerydslRepositorySupport implements MemberRepositoryCustom {

	public MemberRepositoryImpl() {
		super(Member.class);
		// TODO Auto-generated constructor stub
	}

	@Override
	public String getNickname(String _id) {
		// TODO Auto-generated method stub
		QMember member = QMember.member;
		// from members
		JPQLQuery<Member> query = from(member);
		// select nickname from members
		query.select(member);
		// select nickname from members where user_id = #{_id}
		query.where(member.id.eq(_id));
		// 쿼리 실행
		List<Member> result = query.fetch();		
		return (String)result.toArray()[0];
	}

	@Override
	public List<String> getIdsForMention(String mention) {
		// TODO Auto-generated method stub
		QMember member = QMember.member;
		JPQLQuery<String> query = from(member).select(member.id);	
		query.where(member.id.startsWith(mention));
		return query.fetch();
	}


}
