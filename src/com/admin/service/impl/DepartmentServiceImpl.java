package com.admin.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.admin.bean.*;
import com.admin.dao.GroupMemberDAO;
import com.admin.util.MybatisUtil;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.dao.DepartmentDAO;
import com.admin.service.interfaces.IDepartmentService;
import com.admin.util.Page;

/** 
* @author  作者 :zhengym
* @date 创建时间：2019年1月25日 上午10:48:36
* @version 1.0 
* @desrciption		
*/
@Service("departmentService")
public class DepartmentServiceImpl extends AbsServiceImpl<DepartmentDAO> implements IDepartmentService {
	

	@Override
	public Department queryDepartmentById(String departmentId) {
		return mapper.queryDepartmentById(departmentId);
	}

	@Override
	public List<Department> queryDepartmentByClubId(String clubId) {
		return mapper.queryDepartmentByClubId(clubId);
	}

	@Override
	public Map<String,Map<Integer,Integer>> queryManFemaleSum(String clubId) {
		List<ManDepatment> manSun=mapper.queryManSum(clubId);
		List<FemaleDepatement> femanSun=mapper.queryFeMaleSum(clubId);
		Map<String,Map<Integer,Integer>> manFemanSumMap=new HashMap<String,Map<Integer,Integer>>();
		//组成 Map<key部门ID，Map<1男生：男生人数，2女生：女生人数>>
		List<String> depIds=mapper.queryDepartmentIds(clubId);
		for (String depId:depIds){

			Map<Integer,Integer> manFemalSum=new HashMap();
			manFemalSum.put(1,0);
			manFemalSum.put(2,0);
			for (ManDepatment man:manSun){
				if(depId.equals(man.getDepartmentId())){
					manFemalSum.put(1,man.getManSum());
				}
			}
			for (FemaleDepatement feman:femanSun){
				if(depId.equals(feman.getDepartmentId())){
					manFemalSum.put(2,feman.getFemaleSum());
				}
			}
			manFemanSumMap.put(depId,manFemalSum);
		}
        return  manFemanSumMap;
    }

	@Override
	public List<Department> queryDepartmentPage(Page page, String clubId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("keyword1", page.getKeyword1());
		params.put("start", page.getStart());
		params.put("rows", page.getRows());
		params.put("clubId", clubId);
		return mapper.queryDepartmentPage(params);
	}

	@Override
	public int queryDepartmentPageCount(Page page, String clubId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("keyword1", page.getKeyword1());
		params.put("clubId", clubId);
		return mapper.queryDepartmentPageCount(params);
	}

	@Override
	public void addDepartInfo(String preClubId, String departName, String intro,Date birthDate,String collegeId,String clubId) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("preClubId", preClubId);
		params.put("departName", departName);
		params.put("intro", intro);
		params.put("birthDate", birthDate);
		params.put("collegeId", collegeId);
		params.put("clubId", clubId);
		mapper.addDepartInfo(params);
	}

	@Override
	public void updateDepartInfo(String departId, String departName, String intro) {
		// TODO Auto-generated method stub
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("departId", departId);
		params.put("departName", departName);
		params.put("intro", intro);
		mapper.updateDepartInfo(params);
	}

	@Override
	public void deleteDepartInfo(String departId) {
		// TODO Auto-generated method stub
		mapper.deleteDepartInfo(departId);
	}

	@Override
	public List<Map<String, Object>> queryPersonByDepSum(String clubId) {
		return mapper.queryPersonByDepSum(clubId);
	}


	@Override
	public String queryDepartmentNameById(String depId) {
		return mapper.queryDepartmentNameById(depId);
	}

	@Override
	public ManFemalClub queryManFemaleByClubSum(String clubId) {
		return mapper.queryManFemaleByClubSum(clubId);
	}

	public static void main(String[] args) throws Exception {
		MybatisUtil util=new MybatisUtil();
		DepartmentServiceImpl service = util.getMapperServiceImplObject(DepartmentDAO.class, DepartmentServiceImpl.class);
		/*Map<String,Map<Integer,Integer>> map = service.queryManFemaleSum("1010100");
		System.out.println(map);
		String s = service.queryDepartmentNameById("1010102");
		System.out.println(s);
		ManFemalClub manFemalClub = service.queryManFemaleByClubSum("1010100");
		System.out.println(manFemalClub);*/
		List<Map<String, Object>> maps = service.queryPersonByDepSum("1010100");
		for (Map<String,Object> map:maps){
			String departmentId = (String) map.get("departmentId");
			long  sum= (long) map.get("sum");
			System.out.println(sum);
		}
	}
}
