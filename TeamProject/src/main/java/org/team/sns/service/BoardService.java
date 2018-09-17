package org.team.sns.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import org.team.sns.domain.Board;
import org.team.sns.domain.Favorites;
import org.team.sns.domain.Mention;
import org.team.sns.domain.Tag;
import org.team.sns.vo.Datas;
import org.team.sns.vo.BoardSearchCondition;

/**
 * @author ParkHyeokJoon
 * @since 2018.08.30
 * @version 2018.08.31
 *
 */

public interface BoardService {
	public void saveBoard(Board board);
	public List<Tag> tagCheck(ArrayList<String> list,Board board);
	public List<Mention> mentionCheck(ArrayList<String> list,Board board);
	public List<Tag> getTagList(String tag); 
	public List<String> getMentionList(String mention);
	public List<Board> getBoard(BoardSearchCondition params);
	public List<Board> getBoardByListName(String listName,String username,int page);
	public List<Integer> getEmotions(int boardId,String memberid);
	public void addEmotion(int boardId,int type,String memberid);
	public List<Board> getBoardBySearchKeyword(String keyword,int page,String loginedId);
	public List<Integer> getFavorites(String memberid);
	public void setFavorites(String memberid,int id);
	public void setBoardImage(Board board,MultipartFile[] files) throws Exception;
}
