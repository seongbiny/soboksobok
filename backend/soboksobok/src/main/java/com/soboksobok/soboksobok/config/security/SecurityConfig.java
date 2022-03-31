package com.soboksobok.soboksobok.config.security;

import com.soboksobok.soboksobok.repository.user.UserRefreshTokenRepository;
import com.soboksobok.soboksobok.config.properties.AppProperties;
import com.soboksobok.soboksobok.config.properties.CorsProperties;
import com.soboksobok.soboksobok.oauth.entity.RoleType;
import com.soboksobok.soboksobok.oauth.exception.RestAuthenticationEntryPoint;
import com.soboksobok.soboksobok.oauth.filter.TokenAuthenticationFilter;
import com.soboksobok.soboksobok.oauth.handler.OAuth2AuthenticationFailureHandler;
import com.soboksobok.soboksobok.oauth.handler.OAuth2AuthenticationSuccessHandler;
import com.soboksobok.soboksobok.oauth.handler.TokenAccessDeniedHandler;
import com.soboksobok.soboksobok.oauth.repository.OAuth2AuthorizationRequestBasedOnCookieRepository;
import com.soboksobok.soboksobok.oauth.service.CustomOAuth2UserService;
import com.soboksobok.soboksobok.oauth.service.CustomUserDetailsService;
import com.soboksobok.soboksobok.oauth.token.AuthTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CorsProperties corsProperties;
    private final AppProperties appProperties;
    private final AuthTokenProvider tokenProvider;
    private final CustomUserDetailsService userDetailsService;
    private final CustomOAuth2UserService oAuth2UserService;
    private final TokenAccessDeniedHandler tokenAccessDeniedHandler;
    private final UserRefreshTokenRepository userRefreshTokenRepository;

    /*
    * UserDetailsService 설정
    * */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        System.out.println("SecurityConfig - configure");
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        System.out.println("SecurityConfig - configure");
        http
                    .cors()
                .and()
                    .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .csrf().disable()
                    .formLogin().disable()
                    .httpBasic().disable()
                    .exceptionHandling()
                    .authenticationEntryPoint(new RestAuthenticationEntryPoint())
                    .accessDeniedHandler(tokenAccessDeniedHandler)
                .and()
                    .authorizeRequests()
                    .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                    .antMatchers("/swagger-ui/**").permitAll()
                    .antMatchers("/v3/**").permitAll()
                    .antMatchers("/api/**").permitAll()
                    .antMatchers("/swagger-resources/**").permitAll()
//                    .antMatchers("/api/**").hasAnyAuthority(RoleType.USER.getCode())
                    .antMatchers("/api/**/admin/**").hasAnyAuthority(RoleType.ADMIN.getCode())
                    .anyRequest().authenticated()
                .and()
                    .oauth2Login()
                    .authorizationEndpoint()
                    .baseUri("/oauth2/authorization")
                    .authorizationRequestRepository(oAuth2AuthorizationRequestBasedOnCookieRepository())
                .and()
                    .redirectionEndpoint()
                    .baseUri("/*/oauth2/code/*")
                .and()
                    .userInfoEndpoint()
                    .userService(oAuth2UserService)
                .and()
                    .successHandler(oAuth2AuthenticationSuccessHandler())
                    .failureHandler(oAuth2AuthenticationFailureHandler());

        http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

   @Override public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("/welfare/**")
                .antMatchers("/qna/**")
                .antMatchers("/comment/**")
                .antMatchers("/auth/**");
//       web.ignoring().antMatchers(
//               "swagger-ui.html",   // swgger 사용시
//               "/index.html",   // front-end 에서 build한 static file
//               "/qna/**",
//               "qna/**",
//               "/swagger-ui.html"   // swgger 사용시"
//       );
    }

    @Override
    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    protected AuthenticationManager authenticationManager() throws Exception {
        System.out.println("SecurityConfig - authenticationManager");
        return super.authenticationManager();
    }

    /*
    * security 설정 시, 사용할 인코더 설정
    * */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        System.out.println("SecurityConfig - passwordEncoder");
        return new BCryptPasswordEncoder();
    }

    /*
    * 토큰 필터 설정
    * */
    @Bean
    public TokenAuthenticationFilter tokenAuthenticationFilter() {
        System.out.println("SecurityConfig - tokenAuthenticationFilter");
        return new TokenAuthenticationFilter(tokenProvider);
    }

    /*
    * 쿠키 기반 인가 Repository
    * 인가 응답을 연계 하고 검증할 때 사용.
    * */
    @Bean
    public OAuth2AuthorizationRequestBasedOnCookieRepository oAuth2AuthorizationRequestBasedOnCookieRepository() {
        System.out.println("SecurityConfig - oAuth2AuthorizationRequestBasedOnCookieRepository");
        return new OAuth2AuthorizationRequestBasedOnCookieRepository();
    }

    /*
    * Oauth 인증 성공 핸들러
    * */
    @Bean
    public OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler() {
        System.out.println("SecurityConfig - oAuth2AuthenticationSuccessHandler");
        return new OAuth2AuthenticationSuccessHandler(
                tokenProvider,
                appProperties,
                userRefreshTokenRepository,
                oAuth2AuthorizationRequestBasedOnCookieRepository()
        );
    }

    /*
     * Oauth 인증 실패 핸들러
     * */
    @Bean
    public OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler() {
        System.out.println("SecurityConfig - oAuth2AuthenticationFailureHandler");
        return new OAuth2AuthenticationFailureHandler(oAuth2AuthorizationRequestBasedOnCookieRepository());
    }

    /*
    * Cors 설정
    * */
    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        System.out.println("SecurityConfig - corsConfigurationSource");
        UrlBasedCorsConfigurationSource corsConfigSource = new UrlBasedCorsConfigurationSource();

        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowedHeaders(Arrays.asList(corsProperties.getAllowedHeaders().split(",")));
        corsConfig.setAllowedMethods(Arrays.asList(corsProperties.getAllowedMethods().split(",")));
        corsConfig.setAllowedOrigins(Arrays.asList(corsProperties.getAllowedOrigins().split(",")));
        corsConfig.setAllowCredentials(true);
        corsConfig.setMaxAge(corsConfig.getMaxAge());

        corsConfigSource.registerCorsConfiguration("/**", corsConfig);
        return corsConfigSource;
    }
}
