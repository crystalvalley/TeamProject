package org.team.sns.persistence;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.QBoard;
import org.team.sns.domain.QTag;
import org.team.sns.domain.Tag;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.JPQLQuery;

public class TagRepositoryImpl extends QuerydslRepositorySupport implements TagRepositoryCustom {

	public TagRepositoryImpl() {
		super(Tag.class);
		// TODO Auto-generated constructor stub
	}

	@Override
	public Map<String,Object>  getTagPercent(String username) {
		// TODO Auto-generated method stub
		QTag tag = QTag.tag;
		QBoard board = QBoard.board;
		JPQLQuery<Tuple> query = from(tag,board).select(tag.hashTag.count(),tag.hashTag);
		query.join(board);
		query.where(tag.taggedBoards.contains(board));
		query.where(board.writer.id.eq(username));
		query.groupBy(tag.hashTag);
		Map<String,Object> result= new HashMap<>();
		int allCount=0;
		List<Map<String,Object>> subResult = new ArrayList<>();
		for(Tuple t : query.fetch()) {
			Map<String,Object> sub = new HashMap<>();
			sub.put("count", t.get(tag.hashTag.count()));
			sub.put("tag", t.get(tag.hashTag));
			subResult.add(sub);
			allCount+=t.get(tag.hashTag.count());
		}
		result.put("taginfo", subResult);
		result.put("allCount", allCount);
		return result;
	}

}
