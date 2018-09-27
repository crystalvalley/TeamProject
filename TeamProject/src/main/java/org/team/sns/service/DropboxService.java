package org.team.sns.service;

import java.io.ByteArrayInputStream;
import java.net.URLEncoder;
import java.util.Calendar;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.team.sns.domain.Member;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.vo.DropboxVO;
import org.team.sns.vo.DropboxVO.Delete;

import com.dropbox.core.v2.DbxClientV2;
import com.dropbox.core.v2.files.Metadata;

/**
 * 
 * @author ParkHyeokjoon
 * @since 2018.09.02
 * @version 2018.09.17
 *
 */
@Service
public class DropboxService {
	@Autowired
	DbxClientV2 dbxClientV2;
	@Autowired
	MemberRepository mr;

	// 프로필 이미지 업로드
	public String fileUpload(MultipartFile file, String username) throws Exception {
		String filePath = rename(file);
		ByteArrayInputStream bis = new ByteArrayInputStream(file.getBytes());
		Metadata uploadMetadata = dbxClientV2.files().uploadBuilder(filePath).uploadAndFinish(bis);
		System.out.println("uploadMetadata : " + uploadMetadata.toString());
		bis.close();
		Member member = mr.findById(username).get();
		DropboxVO.Delete del = new Delete();
		if (member.getProfileImg() != null) {
			del.setFilePath(member.getProfileImg());
			this.fileDelete(del);
		}
		member.setProfileImg(filePath);
		mr.save(member);
		return uploadMetadata.getPathLower();
	}

	public String imageUpload(MultipartFile file, String username, int index) throws Exception {
		String filePath = rename(file,username,index);
		ByteArrayInputStream bis = new ByteArrayInputStream(file.getBytes());
		Metadata uploadMetadata = dbxClientV2.files().uploadBuilder(filePath).uploadAndFinish(bis);
		System.out.println("uploadMetadata : " + uploadMetadata.toString());
		bis.close();
		return uploadMetadata.getPathLower();

	}

	public void fileDownload(HttpServletResponse response, DropboxVO.Download download) throws Exception {
		response.setContentType("application/octet-stream");
		String name = URLEncoder.encode(download.getFileName(), "UTF-8");
		response.setHeader("Content-Disposition", "attachment; fileName=\"" + name + "\";");
		response.setHeader("Content-Transfer-Encoding", "binary");

		ServletOutputStream out = response.getOutputStream();
		dbxClientV2.files().downloadBuilder(download.getFilePath()).download(out);
		out.flush();
		out.close();
	}

	public void fileDelete(DropboxVO.Delete delete) throws Exception {
		dbxClientV2.files().deleteV2(delete.getFilePath());
	}

	private String rename(MultipartFile file) {
		Calendar cal = Calendar.getInstance();
		String fileName = "";
		fileName += cal.get(Calendar.YEAR) + "";
		String M = null;
		int sub = cal.get(Calendar.MONTH);
		if (sub < 10)
			M = "0" + sub;
		else
			M = sub + "";
		fileName += M;
		fileName += cal.get(Calendar.DAY_OF_MONTH) + "";
		fileName += cal.get(Calendar.HOUR_OF_DAY) + "";
		fileName += cal.get(Calendar.MINUTE) + "";
		fileName += cal.get(Calendar.SECOND) + "";
		int idx = file.getOriginalFilename().indexOf('.');
		fileName += file.getOriginalFilename().substring(idx);
		return "/img/" + fileName;
	}
	private String rename(MultipartFile file,String username,int index) {
		Calendar cal = Calendar.getInstance();
		String fileName = "";
		fileName+=username;
		fileName+=index;
		fileName += cal.get(Calendar.YEAR) + "";
		String M = null;
		int sub = cal.get(Calendar.MONTH);
		if (sub < 10)
			M = "0" + sub;
		else
			M = sub + "";
		fileName += M;
		fileName += cal.get(Calendar.DAY_OF_MONTH) + "";
		fileName += cal.get(Calendar.HOUR_OF_DAY) + "";
		fileName += cal.get(Calendar.MINUTE) + "";
		fileName += cal.get(Calendar.SECOND) + "";
		int idx = file.getOriginalFilename().indexOf('.');
		fileName += file.getOriginalFilename().substring(idx);
		return "/img/" + fileName;
	}

}
