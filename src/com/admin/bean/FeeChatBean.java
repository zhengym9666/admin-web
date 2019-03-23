package com.admin.bean;/**
 * @ClassName:
 * @Description: TODO
 * @author linyb3
 * @date
 */
public class FeeChatBean {
    String month;
    double expend;
    double income;
    double remainMoney;

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public double getExpend() {
        return expend;
    }

    public void setExpend(double expend) {
        this.expend = expend;
    }

    public double getIncome() {
        return income;
    }

    public void setIncome(double income) {
        this.income = income;
    }

    public double getRemainMoney() {
        return remainMoney;
    }

    public void setRemainMoney(double remainMoney) {
        this.remainMoney = remainMoney;
    }

    @Override
    public String toString() {
        return "FeeChatBean{" +
                "month='" + month + '\'' +
                ", expend=" + expend +
                ", income=" + income +
                ", remainMoney=" + remainMoney +
                '}';
    }
}
