package org.team.sns.service;

import java.io.ByteArrayInputStream;
import java.net.URLEncoder;
import java.util.Calendar;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.team.sns.vo.DropboxVO;

import com.dropbox.core.v2.DbxClientV2;
import com.dropbox.core.v2.files.Metadata;

/**
 * 
 * @author ParkHyeokjoon
 * @since 2018.09.02
 * @version 2018.09.02
 *
 */
@Service
public class DropboxService {
	@Autowired
	DbxClientV2 dbxClientV2;
	
	public String fileUpload(MultipartFile file) throws Exception{
		String FilePath = rename(file);
		ByteArrayInputStream bis = new ByteArrayInputStream(file.getBytes());
		Metadata uploadMetadata = dbxClientV2.files().uploadBuilder(FilePath).uploadAndFinish(bis);
		System.out.println("uploadMetadata : "+uploadMetadata.toString());
		bis.close();
		return uploadMetadata.getPathLower();
	}
	
	public void fileDownload(HttpServletResponse response,DropboxVO.Download download) throws Exception{
		response.setContentType("application/octet-stream");
		String name = URLEncoder.encode(download.getFileName(),"UTF-8");
		response.setHeader("Content-Disposition", "attachment; fileName=\""+name+"\";");
		response.setHeader("Content-Transfer-Encoding", "binary");
		
		ServletOutputStream out = response.getOutputStream();
		dbxClientV2.files().downloadBuilder(download.getFilePath()).download(out);
		out.flush();
		out.close();
	}
	
	public void fileDelete(DropboxVO.Delete delete) throws Exception{
		dbxClientV2.files().deleteV2(delete.getFilePath());
	}
	
	private String rename(MultipartFile file) {
		Calendar cal = Calendar.getInstance();
		String fileName = "";
		fileName += cal.get(Calendar.YEAR) + "";
		String M = null;
		int sub = cal.get(Calendar.MONTH);
		if (sub < 10) M = "0" + sub;
		else M = sub + "";
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
