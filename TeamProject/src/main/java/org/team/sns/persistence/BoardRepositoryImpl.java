package org.team.sns.persistence;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.Board;
import org.team.sns.domain.Favorites;
import org.team.sns.domain.Member;
import org.team.sns.domain.Mention;
import org.team.sns.domain.Networking;
import org.team.sns.domain.ProductStrategy;
import org.team.sns.domain.QBoard;
import org.team.sns.domain.QFavorites;
import org.team.sns.domain.QMention;
import org.team.sns.domain.QNetworking;
import org.team.sns.domain.QReply;
import org.team.sns.domain.QShare;
import org.team.sns.domain.QTag;
import org.team.sns.domain.Reply;
import org.team.sns.domain.Share;
import org.team.sns.domain.Strategy;
import org.team.sns.domain.Tag;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.JPQLQuery;

import lombok.extern.java.Log;

/**
 * 
 * @author ParkHyeokjoon
 * @since 18.08.12
 * @version 18.09.09
 *
 */
@Log
public class BoardRepositoryImpl extends QuerydslRepositorySupport implements BoardRepositoryCustom {
	
	@Autowired
	MemberRepository mr;
	@Autowired
	TagRepository tr;

	public BoardRepositoryImpl() {
		super(Board.class);
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<Board> getBoardsByUserId(String _id) {
		QBoard board = QBoard.board;
		// Query생성
		JPQLQuery<Board> boardQuery = from(board);
		// select board
		boardQuery.select(board);
		// 조건 : 작성자 id와 같음
		// 원소 하나 짜리 list안에 포함되어있냐랑 같음
		// .get(0)를 할 경우 쿼리를 하나 더 날리기 때문에 이걸로 처리
		boardQuery.where(board.writer.id.eq(_id));
		// 결과 받아오기
		List<Board> result = boardQuery.fetch();
		return result;
	}

	@Override
	public List<Board> getBoardsByTitle(String searchTitle) {
		// TODO Auto-generated method stub
		// 1. 찾을 대상의 QDomain을 가져옴
		// board를 찾을 거니까 QBoard를 가져옴
		QBoard board = QBoard.board;

		// 2. Query를 생성해주는 JPQLQuery 객체를 만듬
		// Board에 대한 쿼리니까 generic은 Board
		// from부터 설정
		// from boards
		JPQLQuery<Board> boardQuery = from(board);
		// select * from boards
		boardQuery.select(board);
		// QueryDSL에서는 where안의 조건이 참이면 반환
		// board의 title에 파라미터(검색어) title이 포함되어 있다면
		// select * from boards b where b.title like %searchTitle%
		boardQuery.where(board.title.contains(searchTitle));
		// 3. 쿼리 실행 후 result에 대입
		List<Board> result = boardQuery.fetch();
		// 4. result 반환
		return result;
	}

	/**
	 * 
	 * @author Gil
	 * @since 18.08.16
	 * @version 18.08.16 검색어가 내용에 들어있는 게시물 검색
	 */
	@Override
	public List<Board> getBoardByContent(String searchWord) {
		QBoard board = QBoard.board;
		JPQLQuery<Board> boardQuery = from(board);
		boardQuery.select(board);
		boardQuery.where(board.content.contains(searchWord));
		List<Board> result = boardQuery.fetch();
		return result;
	}

	/**
	 * 
	 * @author Gil
	 * @since 18.08.16
	 * @version 18.08.16 힛트카운트 몇 번이상의 게시물만 검색
	 */
	@Override
	public List<Board> getBoardByHitCount(int number) {
		QBoard board = QBoard.board;
		JPQLQuery<Board> boardQuery = from(board);
		boardQuery.select(board);
		boardQuery.where(board.hitCount.gt(number));
		List<Board> result = boardQuery.fetch();
		return result;
	}

	/**
	 * 
	 * @author minju
	 * @since 18.08.17
	 * @version 18.08.17 댓글내용으로 검색을 해서 메소드 getReplyByContent에서 리플 리스트를 불러온다 그 리스트에서
	 *          하나씩(여러개 있을수도 있어서) 검색해 게시글을 불러와서 반환한다. 같이 체크00
	 */
	@Override
	public List<Board> getBoardByReply(String searchWord) {
		QBoard board = QBoard.board;
		JPQLQuery<Board> boardQuery = from(board);
		boardQuery.select(board);

		List<Reply> resultReply = getReplyByContent(searchWord);
		List<Board> resultBoard = null;

		for (Reply re : resultReply) {
			// 생각다시해야함 ?
			resultBoard.add(re.getBoard());
		}
		return resultBoard;
	}

	/**
	 * @author minju
	 * @since 18.08.17
	 * @version 18.08.17 검색 워드를 받아 댓글 리스트를 불러와서 반환한다. 같이 체크00
	 */
	@Override
	public List<Reply> getReplyByContent(String content) {
		QReply reply = QReply.reply;
		JPQLQuery<Reply> replyQuery = from(reply);
		replyQuery.select(reply);
		replyQuery.where(reply.content.contains(content));

		List<Reply> result = replyQuery.fetch();
		return result;
	}

	/**
	 * @author minju
	 * @since 18.08.17
	 * @version 18.08.17 유저 아이디로 네트워킹 리스트를 받아온다(이웃)
	 */
	@Override
	public List<Networking> getMembersByUserId(String _id) {
		QNetworking networking = QNetworking.networking;
		JPQLQuery<Networking> networkingQuery = from(networking);
		networkingQuery.select(networking);
		networkingQuery.where(networking.member.id.eq(_id));

		List<Networking> result = networkingQuery.fetch();
		return result;
	}

	/**
	 * @author minju
	 * @since 18.08.17
	 * @version 18.08.17 getMemberByUserId에서 가져온 이웃 리스트를 가지고 타입별로 보더 리스트를 가져올수 있다.
	 */
	@Override
	public List<Board> getUserTypeByBoard(String _id, String type) {
		QBoard board = QBoard.board;
		JPQLQuery<Board> boardQuery = from(board);
		boardQuery.select(board);

		List<Networking> resultNet = getMembersByUserId(_id);
		List<Board> resultBoard = null;

		// 네이워킹 리스트로 반복문을 돌린다.
		for (Networking ne : resultNet) {
			if (ne.getType().equals(type)) {
				List<Board> list = ne.getTarget().getBoards();
				// 그 네트워킹이 가지고 있는 보드 리스트를 가지고 와서 보드 리스트를 추가해준다.
				for (Board b : list) {
					resultBoard.add(b);
				}
			}
		}
		return resultBoard;
	}

	/**
	 * @author minju
	 * @since 18.08.17
	 * @version 18.08.17 유저 아이디를 받아서 아이디가 가지고 있는 즐겨찾기 리스트를 가져온다.
	 */
	@Override
	public List<Favorites> getUserByFavorites(String id) {
		QFavorites favorites = QFavorites.favorites;
		JPQLQuery<Favorites> favoritesQuery = from(favorites);

		favoritesQuery.select(favorites);
		favoritesQuery.where(favorites.adder.id.eq(id));
		List<Favorites> result = favoritesQuery.fetch();
		return result;
	}

	/**
	 * @author minju
	 * @since 18.08.17
	 * @version 18.08.17 유저아이디를 받아서 그 아이디가 가지고 있는 즐겨찾기리스트를 보드 리스트로 가져온다.
	 */
	@Override
	public List<Board> getFavoritesByBoard(String _id) {
		QBoard board = QBoard.board;
		JPQLQuery<Board> boardQuery = from(board);

		boardQuery.select(board);
		List<Favorites> resultFavorites = getUserByFavorites(_id);
		List<Board> resultBoard = null;

		// 이따 다시 생각하기
		for (Favorites fa : resultFavorites) {
			if (fa.getAdder().getId().equals(_id)) {
				resultBoard.add(fa.getBoard());
			}
		}
		return resultBoard;
	}

	/**
	 * @author minju
	 * @since 18.08.17
	 * @version 18.08.17
	 * 
	 *          공유 리스트를 가져와서 그안에 보드 리스트를 가져와서 뿌려준다. 수정필요 유저 아이디 필요
	 */
	@Override
	public List<Board> getShareByMember(String type) {
		QShare share = QShare.share;
		JPQLQuery<Share> shareQuery = from(share);
		shareQuery.select(share);

		List<Share> result = shareQuery.fetch();
		List<Board> result2 = null;

		for (Share sh : result) {
			if (sh.getType().equals(type)) {
				result2.add(sh.getShared());
			}
		}
		return result2;
	}

	// JPA 로 써도 된다.
	@Override
	public List<Board> getUserAllBoard(String _id) {

		return null;
	}

	@Override
	public List<Board> getBoardByCondition(List<ProductStrategy> pstrList, int page,Member loginId) {
		// TODO Auto-generated method stub
		// 즐겨찾기가 조건에 있다면, 등록날짜 기준
		Boolean check = false;
		QBoard board = QBoard.board;
		QFavorites fav = QFavorites.favorites;
		JPQLQuery<Board> query = from(board);
		JPQLQuery<Favorites> subQuery = from(fav);		
		subQuery.where(fav.adder.eq(loginId));
		subQuery.where(fav.board.eq(board));
		
		query.select(board);
		BooleanBuilder whereCondition = new BooleanBuilder();
		for (ProductStrategy pstr : pstrList) {
			ArrayList<Object> result = checkType(pstr.getStrategies(),loginId);
			whereCondition.or((BooleanBuilder)result.get(0));
			check = (boolean)result.get(1);
		}
		query.where(whereCondition);
		//차단 대상은 제외
		query.where(board.writer.notIn(this.getBlockList(loginId)));
		if(check) {
			// 즐겨찾기 등록 순 정렬은 나중에
			query.orderBy(board.id.desc());
		}else {
			query.orderBy(board.id.desc());
		}
		query.offset(5 * page);
		query.limit(5);
		return query.fetch();
	}

	@Override
	public List<Board> getBoardByKeyword(String keyword,int page,Member loginId) {
		// TODO Auto-generated method stub
		QBoard board = QBoard.board;
		JPQLQuery<Board> query = from(board);
		query.select(board);
		query.where((board.title.contains(keyword)).or(board.plainText.contains(keyword)));
		//차단 대상은 제외
		query.where(board.writer.notIn(this.getBlockList(loginId)));
		query.offset(5*page);
		query.limit(5);
		return query.fetch();
	}

	@Override
	public List<Board> getBoardByHashTag(String keyword,int page,Member loginId) {
		// TODO Auto-generated method stub
		QBoard board = QBoard.board;
		QTag tag = QTag.tag;
		JPQLQuery<Board> query = from(board);
		JPQLQuery<Tag> subQuery = from(tag);
		query.select(board);
		query.where(board.tags.contains(subQuery.where(tag.hashTag.contains(keyword.replaceFirst("#", "")))));
		//차단 대상은 제외
		query.where(board.writer.notIn(this.getBlockList(loginId)));
		query.offset(5*page);
		query.limit(5);
		return query.fetch();
	}

	@Override
	public List<Board> getBoardByMention(String keyword,int page,Member loginId) {
		// TODO Auto-generated method stub
		QBoard board = QBoard.board;
		QMention mention = QMention.mention;
		JPQLQuery<Board> query = from(board);
		JPQLQuery<Mention> subQuery = from(mention);
		query.select(board);
		query.where(board.mentions.contains(subQuery.where(mention.mentioned.id.eq(keyword.replaceFirst("@", "")))));
		//차단 대상은 제외
		query.where(board.writer.notIn(this.getBlockList(loginId)));
		query.offset(5*page);
		query.limit(5);
		return query.fetch();
	}
	// 차단목록
	private JPQLQuery<Member> getBlockList(Member member){
		QNetworking net = QNetworking.networking;
		JPQLQuery<Member> result = from(net).select(net.target);
		result.where(net.member.eq(member));
		result.where(net.type.eq("Block"));
		return result;		
	}
	
	// CustomList를 위한 타입 체크
	public ArrayList<Object> checkType(List<Strategy> strList,Member member) {
		ArrayList<Object> result = new ArrayList<>();
		QBoard board = QBoard.board;
		BooleanBuilder builder = new BooleanBuilder();
		result.add(builder);
		for (Strategy str : strList) {
			switch (str.getType()) {
			// 즐겨찾기의 경우
			case "Favorites": {
				favCheck(board,builder,member);		
				result.add(true);
				break;
			}
			// 태그의 경우
			case "tag": {
				tagCheck(board, builder, str.getTargets());
				break;
			}
			// base인 경우
			default: {
				// 보드의 시퀀스는 1보다 크기때문에 0을 넣으면 됨
				// 즉 다 찾는 다는 이야기
				builder.or(board.id.gt(0));
			}
			}
		}
		if(result.size()<2) {
			result.add(false);
		}
		return result;
	}

	private BooleanBuilder tagCheck(QBoard board, BooleanBuilder builder, String targets) {
		String[] array = targets.split(",");
		for (String target : array) {
			builder.and(board.tags.contains(tr.findById(target).get()));
		}
		return builder;
	}
	private BooleanBuilder favCheck(QBoard board, BooleanBuilder builder,Member member) {
		QFavorites fav = QFavorites.favorites;
		JPQLQuery<Board> subQuery = from(fav).select(fav.board);
		subQuery.where(fav.adder.eq(member));
		builder.and(subQuery.contains(board));
		return builder;
	}
}
