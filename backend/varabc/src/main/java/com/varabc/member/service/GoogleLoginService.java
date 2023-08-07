package com.varabc.member.service;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

@Service
public class GoogleLoginService {
    @Value("${google.oauth2.client_id}")
    private String clientId;

    @Value("${google.oauth2.client_secret}")
    private String clientSecret;

    @Value("${google.oauth2.redirect_uri}")
    private String redirectUri;
    public JsonNode getAccessToken(String authorizeCode){


        final String RequestUrl = "https://www.googleapis.com/oauth2/v4/token";

        final List<NameValuePair> postParams = new ArrayList<NameValuePair>();
        postParams.add(new BasicNameValuePair("grant_type", "authorization_code"));
        postParams.add(new BasicNameValuePair("client_id", clientId));
        postParams.add(new BasicNameValuePair("client_secret", clientSecret));
        postParams.add(new BasicNameValuePair("redirect_uri", redirectUri)); // 리다이렉트 URI
        postParams.add(new BasicNameValuePair("code", authorizeCode)); // 로그인 과정중 얻은 code 값
        System.out.println(authorizeCode);
        System.out.println(postParams);
        System.out.println(redirectUri);
        final HttpClient client = HttpClientBuilder.create().build();
        final HttpPost post = new HttpPost(RequestUrl);
        JsonNode returnNode = null;

        try {
            post.setEntity(new UrlEncodedFormEntity(postParams));
            final HttpResponse response = client.execute(post);
            final int responseCode = response.getStatusLine().getStatusCode();

            // JSON 형태 반환값 처리
            ObjectMapper mapper = new ObjectMapper();
            returnNode = mapper.readTree(response.getEntity().getContent());


        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // clear resources
        }

        return returnNode;
    }



    public static JsonNode getGoogleUserInfo(String autorize_code) {

        final String RequestUrl = "https://www.googleapis.com/oauth2/v2/userinfo";

        final HttpClient client = HttpClientBuilder.create().build();
        final HttpGet get = new HttpGet(RequestUrl);

        JsonNode returnNode = null;

        // add header
        get.addHeader("Authorization", "Bearer " + autorize_code);

        try {
            final HttpResponse response = client.execute(get);
            final int responseCode = response.getStatusLine().getStatusCode();

            ObjectMapper mapper = new ObjectMapper();
            returnNode = mapper.readTree(response.getEntity().getContent());

            System.out.println("\nSending 'GET' request to URL : " + RequestUrl);
            System.out.println("Response Code : " + responseCode);


        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // clear resources
        }
        return returnNode;
    }
}
