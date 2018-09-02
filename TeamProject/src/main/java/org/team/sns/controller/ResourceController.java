package org.team.sns.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.team.sns.service.DropboxService;
import org.team.sns.vo.DropboxVO.Download;

/**
 * @author ParkHyeokJoon
 * @since 2018.09.02
 * @version 2018.09.02
 *
 */
@RestController
@RequestMapping("/resources")
public class ResourceController {
	@Autowired
	DropboxService ds;
	
	@GetMapping("/img/{fileName}")
	public void imageLoad(HttpServletResponse response,@PathVariable("fileName")String fileName) throws Exception {
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");	
        Download download = new Download();
        download.setFileName(fileName);
        download.setFilePath("/img/"+fileName);
        ds.fileDownload(response, download);
	}

}
