package org.team.sns.vo;

import lombok.Data;


/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.08.15
 * @version 2018.08.20
 *
 */

@Data
public class BoardSearchCondition {
	// Card or Board
	private String type;
	// 정렬순서 날짜순 등등
	private String order;
	// 친구만 보는 글, 팔로워만 보는 글 등등 설정
	private String show;
	// 특정 게시자 검색시 (자기것만 보기 등)
	private String target;
	// 태그로 검색
	private String tag;
}
