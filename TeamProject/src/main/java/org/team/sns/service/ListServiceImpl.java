package org.team.sns.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.team.sns.persistence.CustomListRepository;

/**
 * 
 * @author ParkHyeokJoon
 * @Since 18.08.31
 * @version 18.08.31
 *
 */
@Service
public class ListServiceImpl implements ListService{
	@Autowired
	CustomListRepository clr;

	@Override
	public List<String> getListNames() {
		// TODO Auto-generated method stub
		return null;
	}

}
