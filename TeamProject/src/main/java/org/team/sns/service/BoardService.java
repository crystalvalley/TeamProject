package org.team.sns.service;

import java.util.ArrayList;
import java.util.List;

import org.team.sns.domain.Board;
import org.team.sns.domain.Mention;
import org.team.sns.domain.Tag;

/**
 * @author ParkHyeokJoon
 * @since 2018.08.30
 * @version 2018.08.30
 *
 */

public interface BoardService {
	public void saveBoard(Board board);
	public List<Tag> tagCheck(ArrayList<String> list);
	public List<Mention> mentionCheck(ArrayList<String> list,Board board);

}
