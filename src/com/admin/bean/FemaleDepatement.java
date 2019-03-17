package com.admin.bean;/**
 * @ClassName:
 * @Description: TODO
 * @author linyb3
 * @date
 */
public class FemaleDepatement {
    private String departmentId;
    private Integer femaleSum;

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    public Integer getFemaleSum() {
        return femaleSum;
    }

    public void setFemaleSum(Integer femaleSum) {
        this.femaleSum = femaleSum;
    }

    @Override
    public String toString() {
        return "FemaleDepatement{" +
                "departmentId='" + departmentId + '\'' +
                ", femaleSum=" + femaleSum +
                '}';
    }
}
