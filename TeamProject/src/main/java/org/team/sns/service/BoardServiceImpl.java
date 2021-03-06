package org.team.sns.service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.team.sns.domain.Board;
import org.team.sns.domain.CustomListPK;
import org.team.sns.domain.EmotionExpression;
import org.team.sns.domain.Favorites;
import org.team.sns.domain.Member;
import org.team.sns.domain.Mention;
import org.team.sns.domain.Photo;
import org.team.sns.domain.ProductStrategy;
import org.team.sns.domain.Reply;
import org.team.sns.domain.Tag;
import org.team.sns.persistence.BoardRepository;
import org.team.sns.persistence.CustomListRepository;
import org.team.sns.persistence.EmotionRepository;
import org.team.sns.persistence.FavoriteRepository;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.persistence.MentionRepository;
import org.team.sns.persistence.PhotoRepository;
import org.team.sns.persistence.ReplyRepository;
import org.team.sns.persistence.TagRepository;
import org.team.sns.vo.BoardSearchCondition;

/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.08.30
 * @version 2018.08.31
 *
 */

@Service
public class BoardServiceImpl implements BoardService {

	@Autowired
	BoardRepository br;
	@Autowired
	MemberRepository mr;
	@Autowired
	TagRepository tr;
	@Autowired
	MentionRepository mtr;
	@Autowired
	CustomListRepository clr;
	@Autowired
	EmotionRepository er;
	@Autowired
	FavoriteRepository fr;
	@Autowired
	DropboxService ds;
	@Autowired
	PhotoRepository pr;
	@Autowired
	ReplyRepository rr;

	private final static Pattern HASH_PATTERN = Pattern.compile("#[ㅏ-ㅣㄱ-ㅎ가-힣0-9a-zA-Z.]+");
	private final static Pattern MENTION_PATTERN = Pattern.compile("@[ㅏ-ㅣㄱ-ㅎ가-힣0-9a-zA-Z.]+");

	@Override
	public void saveBoard(Board board) {
		// TODO Auto-generated method stub
		// board.setWriter(mr.findById("testid").get());
		String text = board.getContent();
		Matcher hashMatch = HASH_PATTERN.matcher(text);
		Matcher mentionMatch = MENTION_PATTERN.matcher(text);
		ArrayList<String> hashes = new ArrayList<>();
		ArrayList<String> mentions = new ArrayList<>();
		while (hashMatch.find()) {
			hashes.add(hashMatch.group());
		}
		while (mentionMatch.find()) {
			mentions.add(mentionMatch.group());
		}
		// 앞의 @이를 빼줘야하므로
		ArrayList<String> edittedMention = new ArrayList<>();
		for (String m : mentions) {
			edittedMention.add(m.substring(1));
		}
		br.save(board);
		board.setTags(new ArrayList<Tag>());
		tagCheck(hashes, board);
		board.setMentions(mentionCheck(edittedMention, board));
		br.save(board);

	}

	@Override
	public List<Tag> tagCheck(ArrayList<String> list, Board board) {
		// TODO Auto-generated method stub
		ArrayList<Tag> result = new ArrayList<>();
		for (String tag : list) {
			tag = tag.substring(1);
			Tag checkedTag;
			if (tr.existsById(tag)) {
				checkedTag = tr.findById(tag).get();
				checkedTag.addBoard(board);
				tr.save(checkedTag);
				result.add(checkedTag);
			} else {
				checkedTag = new Tag();
				checkedTag.setHashTag(tag);
				checkedTag.setTaggedBoards(new ArrayList<Board>());
				checkedTag.addBoard(board);
				tr.save(checkedTag);
				result.add(checkedTag);
			}
		}
		return result;
	}

	@Override
	public List<Mention> mentionCheck(ArrayList<String> list, Board board) {
		// TODO Auto-generated method stub
		ArrayList<Mention> result = new ArrayList<>();
		Iterable<String> ids = list;
		System.out.println("리스트");
		System.out.println(list);
		Iterable<Member> iMember = mr.findAllById(ids);
		System.out.println("iMember");
		System.out.println(iMember);
		for (Member member : iMember) {
			System.out.println("리스트의 멤버");
			System.out.println(member);
			Mention m = new Mention();
			m.setMentionBoard(board);
			m.setMentioned(member);
			mtr.save(m);
			result.add(m);
		}
		return result;
	}

	@Override
	public List<Tag> getTagList(String tag) {
		// TODO Auto-generated method stub
		return tr.findByHashTagStartingWith(tag);
	}

	@Override
	public List<String> getMentionList(String mention) {
		// TODO Auto-generated method stub
		return mr.getIdsForMention(mention);
	}

	@Override
	public List<Board> getBoard(BoardSearchCondition params) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Board> getBoardByListName(String listName, String userid,int page) {
		// TODO Auto-generated method stub
		// 먼저 list이름을 통해서 조건을 가져옴
		CustomListPK clpk = new CustomListPK();
		clpk.setListName(listName);
		clpk.setOwner(userid);
		List<ProductStrategy> conditions = clr.findById(clpk).get().getConditions();
		List<Board> result = br.getBoardByCondition(conditions, page,mr.findById(userid).get());
		return result;
	}

	@Override
	public List<Integer> getEmotions(int boardId, String memberid) {
		// TODO Auto-generated method stub
		return er.getEmotions(br.findById(boardId).get(), mr.findById(memberid).get());
	}

	@Override	public void addEmotion(int boardId, int type, String memberid) {
		// TODO Auto-generated method stub

		Member member = mr.findById(memberid).get();
		Board board = br.findById(boardId).get();
		EmotionExpression ee = er.findByExpresserAndTargetBoard(member, board);
		if(ee==null) {
			EmotionExpression newee = new EmotionExpression();
			newee = new EmotionExpression();
			newee.setEmotiontype(type);
			newee.setTargetBoard(board);
			newee.setExpresser(member);
			er.save(newee);
		}else {
			ee.setEmotiontype(type);
			er.save(ee);
		}
	}

	@Override
	public List<Board> getBoardBySearchKeyword(String keyword,int page,String loginId) {
		// TODO Auto-generated method stub
		if(keyword.indexOf("#")==0) {
			return br.getBoardByHashTag(keyword,page,mr.findById(loginId).get());
		}else if(keyword.indexOf("@")==0) {
			return br.getBoardByMention(keyword,page,mr.findById(loginId).get());
		}else {
			return br.getBoardByKeyword(keyword,page,mr.findById(loginId).get());
			
		}
	}

	@Override
	public List<Integer> getFavorites(String memberid) {
		// TODO Auto-generated method stub
		return fr.getFavoriteIds(mr.findById(memberid).get());
	}

	@Override
	public void setFavorites(String memberid, int id) {
		// TODO Auto-generated method stub
		Member member = mr.findById(memberid).get();
		Board board = br.findById(id).get();
		Favorites fav = fr.findByAdderAndBoard(member, board);
		if(fav==null) {
			fav = new Favorites();
			fav.setAdder(member);
			fav.setBoard(board);
			fr.save(fav);
		}else {
			fr.delete(fav);
		}
		
	}

	@Override
	public void setBoardImage(Board board, MultipartFile[] files) throws Exception {
		// TODO Auto-generated method stub
		for(int i=0;i<files.length;i++) {
			Photo photo = new Photo();
			photo.setOwnerBoard(board);
			String url = ds.imageUpload(files[i], board.getWriter().getId(), i);
			photo.setUrl(url);
			pr.save(photo);			
		}
	}

	@Override
	public void delReply(int replyNumber) {
		// TODO Auto-generated method stub
		rr.deleteById(replyNumber);
	}

	@Override
	public Reply saveReply(String userid, int cardnum, String content) {
		// TODO Auto-generated method stub

		Reply reply = new Reply();
		Member member = new Member();
		member = mr.findById(userid).get();
		reply.setContent(content);
		reply.setWriter(member);
		Board board = br.findById(cardnum).get();
		System.out.println(board);
		reply.setBoard(board);
		reply.setOrderPosition("0");
		rr.save(reply);
		return reply;
	}

	@Override
	public void delBoard(int boardnum, String userid) {
		// TODO Auto-generated method stub
		Board target = br.findById(boardnum).get();
		List<Tag> tags= target.getTags(); 
		if(target.getWriter().getId().equals(userid)) {
			br.delete(target);
		}
		saveTags(tags);
	}

	@Override
	public void saveTags(List<Tag> tags) {
		// TODO Auto-generated method stub
		for(Tag tag:tags) {
			tr.save(tag);
		}
	}

}
