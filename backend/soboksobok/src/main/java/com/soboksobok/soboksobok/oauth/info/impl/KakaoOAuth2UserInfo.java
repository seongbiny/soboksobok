package com.soboksobok.soboksobok.oauth.info.impl;

import com.soboksobok.soboksobok.oauth.info.OAuth2UserInfo;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getName() {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");
        System.out.println("이건 가져오는데.."+attributes.get("kakao_account"));

        if (properties == null) {
            return null;
        }

        return (String) properties.get("nickname");
    }

//    @Override
//    public String getEmail() {
//        Map<String, Object> info = (Map<String, Object>) attributes.get("kakao_account");
//        return (String) info.get("email");
//    }

    @Override
    public String getImageUrl() {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");

        if (properties == null) {
            return null;
        }

        return (String) properties.get("thumbnail_image");
    }
//
//    @Override
//    public String getAgeRange() {
//        Map<String, Object> info = (Map<String, Object>) attributes.get("kakao_account");
//        System.out.println("가져오나?"+info.get("age_range"));
//        return (String) info.get("age_range");
//    }
//
//    @Override
//    public String getGender() {
//        Map<String, Object> info = (Map<String, Object>) attributes.get("kakao_account");
//        return (String) info.get("gender");
//    }
//
//    @Override
//    public String getBirth() {
//        Map<String, Object> info = (Map<String, Object>) attributes.get("kakao_account");
//        return (String) info.get("birthday");
//    }
}
