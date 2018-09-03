package org.team.sns.persistence;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.Board;
import org.team.sns.domain.EmotionExpression;
import org.team.sns.domain.Member;
import org.team.sns.domain.QEmotionExpression;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.JPQLQuery;

public class EmotionRepositoryImpl extends QuerydslRepositorySupport implements EmotionRepositoryCustom {
	public EmotionRepositoryImpl() {
		super(EmotionExpression.class);
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<Integer> getEmotions(Board board,Member member) {
		// TODO Auto-generated method stub
		QEmotionExpression emotion = QEmotionExpression.emotionExpression;
		JPQLQuery<Integer> selectionQuery = from(emotion).select(emotion.emotiontype);
		selectionQuery.where(emotion.expresser.eq(member));
		selectionQuery.where(emotion.targetBoard.eq(board));
		JPQLQuery<Tuple> query = from(emotion).select(emotion.emotiontype, emotion.emotiontype.count());;
		query.groupBy(emotion.emotiontype);
		query.where(emotion.targetBoard.eq(board));
		ArrayList<Integer> result = new ArrayList<>();
		result.add(selectionQuery.fetchFirst());
		result.add(0);
		result.add(0);
		result.add(0);
		result.add(0);
		result.add(0);
		for(Tuple row:query.fetch()) {	
			result.set(row.get(emotion.emotiontype), (int)(long)row.get(emotion.emotiontype.count()));
		}
		return result;
	}


}
