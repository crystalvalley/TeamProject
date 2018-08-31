package org.team.sns.persistence.utils;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.team.sns.domain.QBoard;
import org.team.sns.domain.StrTarget;
import org.team.sns.domain.Strategy;
import org.team.sns.persistence.TagRepository;

import com.querydsl.core.BooleanBuilder;
/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.09.01
 * @version 2018.09.01
 *
 */
@Component
public class Utility {
	@Autowired
	TagRepository tr;
	// CustomList를 위한 타입 체크
	public BooleanBuilder checkType(List<Strategy> strList) {
		QBoard board = QBoard.board;
		BooleanBuilder builder = new BooleanBuilder();
		for(Strategy str : strList) {
			switch(str.getType()) {
				//태그의 경우
				case "tag" : {
					tagCheck(board,builder,str.getTargets());
					break;
				}
				// base인 경우
				default : {
					// 보드의 시퀀스는 1보다 크기때문에 0을 넣으면 됨
					// 즉 다 찾는 다는 이야기
					builder.or(board.id.gt(0));
				}
			}
		}		
		return builder;
	}
	
	private BooleanBuilder tagCheck(QBoard board,BooleanBuilder builder,List<StrTarget> targets) {
		for(StrTarget target : targets) {
			builder.and(board.tags.contains(tr.findById(target.getTarget()).get()));
		}		
		return builder;
	}
}
