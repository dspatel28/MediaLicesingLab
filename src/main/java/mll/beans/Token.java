package mll.beans;

import java.io.Serializable;
import java.util.Date;

public class Token  implements Serializable
{
	private static final long serialVersionUID = -1256092462251887337L;
	
	private Integer id;
	private String token;
	private String emailId;
	private Integer userId;
	private Date issueDate;
	private Boolean isUsed = false;
	private String inviteType;
	
	private Boolean isGenerated;
	private String url;
	private String errorMessage;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public Date getIssueDate() {
		return issueDate;
	}
	public void setIssueDate(Date issueDate) {
		this.issueDate = issueDate;
	}
	public Boolean getIsUsed() {
		return isUsed;
	}
	public void setIsUsed(Boolean isUsed) {
		this.isUsed = isUsed;
	}
	public String getInviteType() {
		return inviteType;
	}
	public void setInviteType(String inviteType) {
		this.inviteType = inviteType;
	}
	public Boolean getIsGenerated() {
		return isGenerated;
	}
	public void setIsGenerated(Boolean isGenerated) {
		this.isGenerated = isGenerated;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
}
