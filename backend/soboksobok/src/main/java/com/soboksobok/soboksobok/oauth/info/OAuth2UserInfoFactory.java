package com.soboksobok.soboksobok.oauth.info;

import com.soboksobok.soboksobok.oauth.entity.ProviderType;
import com.soboksobok.soboksobok.oauth.info.impl.KakaoOAuth2UserInfo;

import java.util.Map;

public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(ProviderType providerType, Map<String, Object> attributes) {
        System.out.println("OAuth2UserInfoFactory - getOAuth2UserInfo");
        switch (providerType) {
            case KAKAO: return new KakaoOAuth2UserInfo(attributes);
            default: throw new IllegalArgumentException("Invalid Provider Type.");
        }
    }
}
