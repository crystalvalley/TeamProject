package org.team.sns.service;

import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.team.sns.persistence.BoardRepository;
import org.team.sns.persistence.CustomListRepository;
import org.team.sns.persistence.EmotionRepository;
import org.team.sns.persistence.FavoriteRepository;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.persistence.MentionRepository;
import org.team.sns.persistence.TagRepository;

/**
 * @author JoonsungGil
 * @since 2018.09.06
 * @version 2018.09.06
 *
 */

@Service
public class GroupServiceImpl implements GroupService {

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

	private final static Pattern HASH_PATTERN = Pattern.compile("#[ㅏ-ㅣㄱ-ㅎ가-힣0-9a-zA-Z.]+");
	private final static Pattern MENTION_PATTERN = Pattern.compile("@[ㅏ-ㅣㄱ-ㅎ가-힣0-9a-zA-Z.]+");

	

}
