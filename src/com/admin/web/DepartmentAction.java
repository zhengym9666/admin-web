package com.admin.web;/**
 * @ClassName:
 * @Description: TODO
 * @author linyb3
 * @date
 */

import com.admin.bean.Club;
import com.admin.bean.GroupMember;
import com.admin.bean.ManFemalClub;
import com.admin.bean.Student;
import com.admin.service.interfaces.IClubService;
import com.admin.service.interfaces.IDepartmentService;
import com.admin.service.interfaces.IGroupMemberService;
import com.admin.service.interfaces.IStudentService;
import com.alibaba.fastjson.JSONObject;
import net.sf.json.JSONArray;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.*;

@Controller
@RequestMapping("/department")
public class DepartmentAction {
    @Autowired
    IStudentService studentService;
    @Autowired
    IDepartmentService departmentService;
    @Autowired
    IClubService clubService;
    private static transient Log log = LogFactory.getLog(DepartmentAction.class);

    //获取部门的男女人数
    @RequestMapping(value="/queryManFemanSum.action",method=RequestMethod.POST)
    public ResponseEntity<Map> queryManFemanSum(HttpServletRequest request, HttpSession session) throws IOException {
        JSONObject returnJson = new JSONObject();
        JSONArray root = new JSONArray();
        //男生人数
        JSONArray manValue = new JSONArray();
        //
        JSONArray femanValue = new JSONArray();
        //部门
        JSONArray xArray = new JSONArray();
        JSONObject json=new JSONObject();
        //获取当前的社团ID
        String clubId = (String) request.getSession().getAttribute("clubId ");
        if(clubId==null || clubId.length()==0){
            //测试使用
            clubId="1010100";
        }
        try {
            Map<String, Map<Integer, Integer>> manFemaleSumMap = departmentService.queryManFemaleSum(clubId);
            Set<Map.Entry<String, Map<Integer, Integer>>> entries = manFemaleSumMap.entrySet();

            for (Map.Entry entry: entries){
                //获取部门ID
                String depId= (String) entry.getKey();
                String depName=departmentService.queryDepartmentNameById(depId);
                xArray.add(depName);

                Map<Integer, Integer> manFemaleMap= (Map<Integer, Integer>) entry.getValue();
                manValue.add(manFemaleMap.get(1));//男生人数
                femanValue.add(manFemaleMap.get(2));//女生人数
            }


            /*测试数据 manValue.add("2");
            manValue.add("14");
            manValue.add("5");
            femanValue.add("23");
            femanValue.add("22");
            femanValue.add("12");
            JSONObject j1=new JSONObject();
            j1.put("name", "A部门");
            j1.put("value", "A");
            JSONObject j2=new JSONObject();
            j2.put("name", "b部门");
            j2.put("value", "b");
            xArray.add("A部门");
            xArray.add("B部门");*/
            json.put("manValue", manValue);
            json.put("femaleValue", femanValue);
            json.put("xArray", xArray);
            root.add(json);
            returnJson.put("root", root);
            returnJson.put("success", true);
        }catch (Exception e){
            log.error("获取部门的男女人数失败：",e);
        }
        finally {
        }
        return ResponseEntity.ok(returnJson);
    }

    //获取当前社团的男女人数
    @RequestMapping(value="/queryManFemaleByClubSum.action",method=RequestMethod.POST)
    public ResponseEntity<Map> queryManFemaleByClubSum(HttpServletRequest request, HttpSession session) throws IOException {
        JSONObject returnJson = new JSONObject();
        JSONArray root = new JSONArray();
        //男生人数
        JSONArray manValue = new JSONArray();
        //
        JSONArray femanValue = new JSONArray();
        //部门
        JSONArray xArray = new JSONArray();
        JSONObject json=new JSONObject();
        try {
            //获取当前的社团ID
            String clubId = (String) request.getSession().getAttribute("clubId ");
            if(clubId==null || clubId.length()==0){
                //测试使用
                clubId="1010100";
            }
            Club club = clubService.getClubById(clubId);
            ManFemalClub clubSum=departmentService.queryManFemaleByClubSum(clubId);
            manValue.add(clubSum.getManSum());
            femanValue.add(clubSum.getFamale());
            xArray.add(club.getClubName());
            json.put("manValue", manValue);
            json.put("femaleValue", femanValue);
            json.put("xArray", xArray);

            /*//测试数据
            manValue.add("2");
            manValue.add("14");
            manValue.add("5");
            femanValue.add("23");
            femanValue.add("22");
            femanValue.add("12");
            JSONObject j1=new JSONObject();
            j1.put("name", "A部门");
            j1.put("value", "A");
            JSONObject j2=new JSONObject();
            j2.put("name", "b部门");
            j2.put("value", "b");
            xArray.add("男生比例");
            xArray.add("女生比例");*/

            json.put("manValue", manValue);
            json.put("femanValue", femanValue);
            json.put("xArray", xArray);
            root.add(json);
            returnJson.put("root", root);
            returnJson.put("success", true);
        }catch (Exception e){
            log.error("获取部门的男女人数失败：",e);
        }
        finally {
        }
        return ResponseEntity.ok(returnJson);
    }

}
