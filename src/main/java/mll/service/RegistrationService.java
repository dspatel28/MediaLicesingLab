package mll.service;

import java.io.BufferedReader;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import mll.beans.AdminUser;
import mll.beans.Musician;
import mll.beans.Token;
import mll.beans.User;
import mll.beans.UserDetails;
import mll.dao.RegistrationDAO;

public class RegistrationService {
	RegistrationDAO dao;

	public RegistrationService() {
		dao = new RegistrationDAO();
	}

	@SuppressWarnings("unchecked")
	public JSONObject register(HttpServletRequest request, HttpServletResponse response) {
		JSONObject responseObject = new JSONObject();

		try {
			UserDetails userdetails = populateUserDetailBeanFromRequest(request);

			if (null != userdetails) {
				responseObject = dao.registerUser(userdetails);
			} else {
				responseObject.put("isRegistered", false);
				responseObject.put("errorMessage", "Error while registration. Please submit with proper user details.");
			}
		} catch (Exception e) {
			e.printStackTrace();
			responseObject.put("isRegistered", false);
			responseObject.put("errorMessage", "Error while registration. Please submit with proper user details.");
		}

		return responseObject;
	}

	/**
	 * This method takes http request as input and validates the request and if
	 * it is valid then creates the metadata list from the request object.
	 *
	 * @author Dhaval Patel
	 * @version 1.0
	 * @since 2016-03-24
	 */
	public UserDetails populateUserDetailBeanFromRequest(HttpServletRequest request) throws Exception {
		StringBuffer requestStr = new StringBuffer();
		BufferedReader reader = request.getReader();
		String line = null;
		while ((line = reader.readLine()) != null) {
			requestStr.append(line);
		}

		JSONParser parser = new JSONParser();
		JSONObject mainObject = (JSONObject) parser.parse(requestStr.toString());

		UserDetails userdetails = new UserDetails();
		
		userdetails.setToken(populateToken(mainObject));
		userdetails.setType((String) mainObject.get("type"));

		userdetails.setUsers(populateUser(mainObject));

		if (userdetails.getType().equalsIgnoreCase("user")) 
		{
			userdetails.setAdminUser(populateAdminUser(mainObject));

		} else
		{
			userdetails.setMusician(populateMusician(mainObject));
		}

		return userdetails;
	}

	public User populateUser(JSONObject jo) {
		User u = new User();
		if (null != jo) 
		{
			u.setUserName((String) jo.get("userName"));
			u.setPassword((String) jo.get("password"));
			u.setEmailId((String) jo.get("emailId"));
		}
		return u;

	}

	public AdminUser populateAdminUser(JSONObject jo) {
		AdminUser au = new AdminUser();
		if (null != jo) 
		{
			au.setFirstName((String) jo.get("firstName"));
			au.setLastName((String) jo.get("lastName"));
			au.setCollege((String) jo.get("college"));
			au.setLevel((String) jo.get("level"));
			au.setGender((String) jo.get("gender"));
			au.setPreference((String) jo.get("preference"));
			au.setAge((Integer) jo.get("age"));

		}
		return au;

	}

	public Musician populateMusician(JSONObject jo) {
		Musician m = new Musician();
		if (null != jo) 
		{
			m.setName((String) jo.get("name"));

		}
		return m;

	}
	
	
	public Token populateToken(JSONObject jo) {
		Token t = new Token();
		if (null != jo) 
		{
			t.setToken((String) jo.get("token"));
			

		}
		return t;

	}	
}