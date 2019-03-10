package com.admin.util;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.web.multipart.MultipartFile;

public class UploadImageUtil {
	
	private static String path = "G:\\community\\headImages\\";
	
	
	  private String fileType;//图片类型
	  private int maxSize;//图片大小
/*	  private Long width;
	  private Long height;*/
	  public UploadImageUtil() { }
	  public UploadImageUtil(String fileType, int maxSize) {
	    this.fileType = fileType;
	    this.maxSize = maxSize;
/*	    this.width = width;
	    this.height = height;*/
	  }
	  
	  public String getFileType() {
		    return fileType;
		  }
		  public void setFileType(String fileType) {
		    this.fileType = fileType;
		  }
		  public int getMaxSize() {
		    return maxSize;
		  }
		  public void setMaxSize(int maxSize) {
		    this.maxSize = maxSize;
		  }
	  /**
	   * 检查上传图像大小
	   *
	   * @param upload
	   * @param uploadFileName
	   * @param uploadContentType
	   * @return
	   */
	  public String checkUploadImage(MultipartFile file,String uploadContentType) {
	    if (fileType != null) {
	        String[] fileTypes = fileType.split(",");
	        int count = 0;
	        for (int i = 0; i < fileTypes.length; i++) {
	          if (uploadContentType.equals(fileTypes[i])) {
	            count++;
	            continue;
	          }
	        }
	        if (count == 0) {
	          return "您上传的文件类型不对!";
	        }
	      }
	      //BufferedImage bi = ImageIO.read(upload);
/*	      int w = bi.getWidth();
	      int h = bi.getHeight();
	      if (w > width || h > height) {
	        return "上传照片宽度和高度不符合要求";
	      }*/
	      if (file.getSize() > maxSize) {
	        return "上传照片过大";
	      }
	    return null;
	  }


	
//	获取文件的扩展名
	private static String getExtName(MultipartFile file){
		return FilenameUtils.getExtension(file.getOriginalFilename());
	}
	
//	创建文件的新名
	private static String createNewName(MultipartFile file,String fileName){
		//return UUID.randomUUID().toString()+"."+getExtName(file);
		return fileName+"."+getExtName(file);
	}
	
	  /**
	   * 清除文件	
	   * @param path
	 * @return 
	   */
	  private void clear(String path) {
	    File file = new File(path);
	    if (file.isFile() && file.exists()) {
	      file.delete();
	    }
	  }
	
//	外界可以调用的获取文件路径
	public String upload(MultipartFile file,String fileName) throws Exception{
		String newName = null;
		try {
			newName = createNewName(file,fileName);
			clear(path + newName);//拷贝文件前先删除已存在文件
			FileUtils.copyInputStreamToFile(file.getInputStream(), new File(path + newName));
		} catch (Exception e) {
			// TODO: handle exception
			throw e;
		}
		return newName;
	}
	
}