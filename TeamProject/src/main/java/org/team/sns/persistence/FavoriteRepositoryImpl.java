package org.team.sns.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.Favorites;
import org.team.sns.domain.Member;
import org.team.sns.domain.QFavorites;

import com.querydsl.jpa.JPQLQuery;

public class FavoriteRepositoryImpl extends QuerydslRepositorySupport implements FavoriteRepositoryCustom{

	public FavoriteRepositoryImpl() {
		super(Favorites.class);
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<Integer> getFavoriteIds(Member member) {
		// TODO Auto-generated method stub
		QFavorites fav = QFavorites.favorites;
		JPQLQuery<Integer> query = from(fav).select(fav.board.id);
		query.where(fav.adder.eq(member));
		return query.fetch();
	}

}
