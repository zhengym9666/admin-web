package com.admin.bean;

import java.util.Date;

public class News {
	private int id;
	private String author;
	private String submitter;
	private Date submit_time;
	private Date revise_time;
	private String title;
	private String content;
	private String image;
	private int readcount;
	private String collegeId;
	private String clubId;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getSubmitter() {
		return submitter;
	}
	public void setSubmitter(String submitter) {
		this.submitter = submitter;
	}
	public Date getSubmit_time() {
		return submit_time;
	}
	public void setSubmit_time(Date submit_time) {
		this.submit_time = submit_time;
	}
	public Date getRevise_time() {
		return revise_time;
	}
	public void setRevise_time(Date revise_time) {
		this.revise_time = revise_time;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public int getReadcount() {
		return readcount;
	}
	public void setReadcount(int readcount) {
		this.readcount = readcount;
	}
	public String getCollegeId() {
		return collegeId;
	}
	public void setCollegeId(String collegeId) {
		this.collegeId = collegeId;
	}
	public String getClubId() {
		return clubId;
	}
	public void setClubId(String clubId) {
		this.clubId = clubId;
	}

	@Override
	public String toString() {
		return "News{" +
				"id=" + id +
				", author='" + author + '\'' +
				", submitter='" + submitter + '\'' +
				", submit_time='" + submit_time + '\'' +
				", revise_time='" + revise_time + '\'' +
				", title='" + title + '\'' +
				", content='" + content + '\'' +
				", image='" + image + '\'' +
				", readcount=" + readcount +
				", collegeId='" + collegeId + '\'' +
				", clubId='" + clubId + '\'' +
				'}';
	}
}
