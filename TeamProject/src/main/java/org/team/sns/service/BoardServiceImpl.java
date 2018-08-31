package org.team.sns.service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.team.sns.domain.Board;
import org.team.sns.domain.Member;
import org.team.sns.domain.Mention;
import org.team.sns.domain.Tag;
import org.team.sns.persistence.BoardRepository;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.persistence.MentionRepository;
import org.team.sns.persistence.TagRepository;

/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.08.30
 * @version 2018.08.31
 *
 */

@Service
public class BoardServiceImpl implements BoardService{

	@Autowired
	BoardRepository br;
	@Autowired
	MemberRepository mr;
	@Autowired
	TagRepository tr;
	@Autowired
	MentionRepository mtr;
	
	private final static Pattern HASH_PATTERN = Pattern.compile("#[ㅏ-ㅣㄱ-ㅎ가-힣0-9a-zA-Z.]+"); 
	private final static Pattern MENTION_PATTERN = Pattern.compile("@[ㅏ-ㅣㄱ-ㅎ가-힣0-9a-zA-Z.]+"); 
	
	@Override
	public void saveBoard(Board board) {
		// TODO Auto-generated method stub
		board.setWriter(mr.findById("testid").get());
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
	    for(String m : mentions) {
	    	edittedMention.add(m.substring(1));
	    }
		br.save(board);
		board.setTags(new ArrayList<Tag>());
	    tagCheck(hashes,board);
	    board.setMentions(mentionCheck(edittedMention,board));
		br.save(board);		
	    
	}

	@Override
	public List<Tag> tagCheck(ArrayList<String> list,Board board) {
		// TODO Auto-generated method stub
		ArrayList<Tag> result = new ArrayList<>();
		for(String tag : list) {
			tag = tag.substring(1);
			Tag checkedTag;
			if(tr.existsById(tag)) {
				checkedTag = tr.findById(tag).get();
				checkedTag.addBoard(board);
				tr.save(checkedTag);
				result.add(checkedTag);
			}else{
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
	public List<Mention> mentionCheck(ArrayList<String> list,Board board) {
		// TODO Auto-generated method stub
		ArrayList<Mention> result = new ArrayList<>();
		Iterable<String> ids = list;
		System.out.println("리스트");
		System.out.println(list);
		Iterable<Member> iMember =  mr.findAllById(ids);
		System.out.println("iMember");
		System.out.println(iMember);
		for(Member member : iMember) {
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

}
