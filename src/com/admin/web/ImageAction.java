package com.admin.web;/**
 * @ClassName:
 * @Description: TODO
 * @author linyb3
 * @date
 */

import com.admin.bean.Department;
import com.admin.util.Page;
import org.apache.commons.io.FileUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.Action;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @ClassName:
 * @Description: TODO
 * @author linyb3
 * @date
 *
 */
@Controller
@RequestMapping("/image")
public class ImageAction {


    /**
     * 图片上传
     * @throws Exception
     */
    @RequestMapping(value = "/upload.action",method=RequestMethod.POST)
    public ResponseEntity<Map> upload(MultipartFile imgFile,HttpServletRequest request) throws Exception{
        Map<String,Object> resultMap = new HashMap<String,Object>();
        try {

            String dirName = request.getParameter("dir");

            //System.out.println(imgFile);
            //System.out.println(imgFileFileName);

            //需求：把上传的图片放在webapp的upload目录
            //获取项目的upload目录的绝对路径
            //使用ServletContext的getRealPath():获取项目里面的文件或目录的绝对路径
            String uploadPath = request.getServletContext().getRealPath("/upload");
            System.out.println(uploadPath);

            //生成唯一的随机文件名称 : uuid
            String uuid = UUID.randomUUID().toString();
            //获取文件的后缀名  .jpg
            String originalFilename = imgFile.getOriginalFilename();
            String extName = originalFilename.substring(originalFilename.lastIndexOf("."));
            //新的文件名
            String fileName = uuid+extName;
            /**
             * 参数一：源文件
             * 参数二：目标文件（拷贝到的地方）
             */
            FileUtils.copyInputStreamToFile(imgFile.getInputStream(), new File(uploadPath+"/"+fileName));


            //使用ServletContext.getContexPath(): 获取文件的项目的相对路径    /bos-web/upload/dfff.jpg
            String fileContextPath = request.getServletContext().getContextPath()+"/upload/"+fileName;

            System.out.println(fileContextPath);

            //上传成功
            resultMap.put("error", 0);
            //返回上传成功后目标文件的路径(项目的相对路径就可以啦)
            resultMap.put("url", fileContextPath);
        } catch (Exception e) {
            e.printStackTrace();
            //上传失败
            resultMap.put("error", 1);
            resultMap.put("message", e.getMessage());
        }
        return ResponseEntity.ok(resultMap);
    }


    /**
     * 查询文件，返回给图片空间
	 * @throws Exception
	 */
    @RequestMapping(value = "/manager.action",method=RequestMethod.GET)
    public ResponseEntity<Map> manager(HttpServletRequest request) throws Exception{
        Map<String,Object> resultMap = new HashMap<String,Object>();
        //1.找到upload目录(绝对路径)
        String uploadPath = request.getServletContext().getRealPath("/upload");

        File uploadFile = new File(uploadPath);

        //2.获取upload目录里面的所有文件
        //遍历目录取的文件信息
        //图片扩展名
        String[] fileTypes = new String[]{"gif", "jpg", "jpeg", "png", "bmp"};

        List<Hashtable> fileList = new ArrayList<Hashtable>();
        if(uploadFile.listFiles() != null) {
            for (File file : uploadFile.listFiles()) {
                Hashtable<String, Object> hash = new Hashtable<String, Object>();
                String fileName = file.getName();
                //判断是否为目录
                if(file.isDirectory()) {
                    //目录
                    hash.put("is_dir", true);
                    hash.put("has_file", (file.listFiles() != null));
                    hash.put("filesize", 0L);
                    hash.put("is_photo", false);
                    hash.put("filetype", "");
                } else if(file.isFile()){
                    //文件
                    String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
                    hash.put("is_dir", false);
                    hash.put("has_file", false);
                    hash.put("filesize", file.length());
                    hash.put("is_photo", Arrays.<String>asList(fileTypes).contains(fileExt));
                    hash.put("filetype", fileExt);
                }
                hash.put("filename", fileName);
                hash.put("datetime", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(file.lastModified()));
                fileList.add(hash);
            }
        }

        String current_url = request.getServletContext().getContextPath()+"/upload/";

        //3.把文件信息（文件名，更新时间，后缀名等）返回成json格式数据给KindEditor
        //返回所有文件信息列表
        resultMap.put("file_list", fileList);
        //返回文件所在的项目的路径
        resultMap.put("current_url", current_url);

        return ResponseEntity.ok(resultMap);
    }

    /**
     * 查询文件，返回给图片空间
     * @throws Exception
     */
    @RequestMapping(value = "/deleImage.action",method=RequestMethod.POST)
    public ResponseEntity<Map> deleImage(HttpServletRequest request) throws Exception{
        Map<String,Object> resultMap = new HashMap<String,Object>();
        //1.找到upload目录(绝对路径)
        String  CurrentIsDir= (String) request.getParameter("CurrentIsDir");
        String  CrrentDelUrl= (String) request.getParameter("CrrentDelUrl");
        //去掉项目名
        CrrentDelUrl = CrrentDelUrl.substring(CrrentDelUrl.substring(1).indexOf("/") + 1);
        String uploadPath = request.getServletContext().getRealPath(CrrentDelUrl);

        File uploadFile = new File(uploadPath);

        if(uploadFile.exists()){
            uploadFile.delete();
            resultMap.put("status", 0);
        }


        if(uploadFile.exists()){
            resultMap.put("status", 1);
            resultMap.put("msg", "删除文件失败,请重试");
        }


        return ResponseEntity.ok(resultMap);
    }
}
