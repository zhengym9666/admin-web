package com.admin.bean;/**
 * @ClassName:
 * @Description: TODO
 * @author linyb3
 * @date
 */

/**
 * @ClassName:
 * @Description: TODO
 * @author linyb3
 * @date
 *
 */
public class ManFemalClub {
    private Integer manSum;
    private Integer femaleSum;
    private String clubId;

    public Integer getManSum() {
        return manSum;
    }

    public void setManSum(Integer manSum) {
        this.manSum = manSum;
    }

    public Integer getFamale() {
        return femaleSum;
    }

    public void setFamale(Integer femaleSum) {
        this.femaleSum = femaleSum;
    }

    public String getClubId() {
        return clubId;
    }

    public void setClubId(String clubId) {
        this.clubId = clubId;
    }

    @Override
    public String toString() {
        return "ManFemalClub{" +
                "manSum=" + manSum +
                ", famale=" + femaleSum +
                ", clubId='" + clubId + '\'' +
                '}';
    }
}
