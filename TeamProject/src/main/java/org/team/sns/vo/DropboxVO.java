package org.team.sns.vo;

import org.springframework.web.multipart.MultipartFile;

/**
 * 
 * @author ParkHyeokjoon
 * @since 2018.09.02
 * @version 2018.09.02
 *
 */
public class DropboxVO {
	public static class Upload{
		private String filePath;
		private MultipartFile file;
		
		public String getFilePath() {
			return filePath;
		}
		public void setFilePath(String filePath) {
			this.filePath=filePath;
		}
		public MultipartFile getFile() {
			return file;
		}
		public void setFile(MultipartFile file) {
			this.file = file;
		}		
	}
	
	public static class Download{
		private String fileName;
		private String filePath;
		public String getFileName() {
			return fileName;
		}
		public void setFileName(String fileName) {
			this.fileName = fileName;
		}
		public String getFilePath() {
			return filePath;
		}
		public void setFilePath(String filePath) {
			this.filePath = filePath;
		}		
	}
	public static class Delete{
		private String filePath;

		public String getFilePath() {
			return filePath;
		}

		public void setFilePath(String filePath) {
			this.filePath = filePath;
		}		
	}
	public static class Response{
		private int statusCode;
		private String message;
		public Response(int statusCode, String message) {
			super();
			this.statusCode = statusCode;
			this.message = message;
		}
		public int getStatusCode() {
			return statusCode;
		}
		public void setStatusCode(int statusCode) {
			this.statusCode = statusCode;
		}
		public String getMessage() {
			return message;
		}
		public void setMessage(String message) {
			this.message = message;
		}		
	}
}