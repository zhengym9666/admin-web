package com.admin.bean;/**
 * @ClassName:
 * @Description: TODO
 * @author linyb3
 * @date
 */
public class ManDepatment {
    private String departmentId;
    private Integer manSum;

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    public Integer getManSum() {
        return manSum;
    }

    public void setManSum(Integer manSum) {
        this.manSum = manSum;
    }

    @Override
    public String toString() {
        return "ManDepatment{" +
                "departmentId='" + departmentId + '\'' +
                ", manSum=" + manSum +
                '}';
    }
}
