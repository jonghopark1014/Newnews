package com.ssafy.specialization.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.specialization.dto.LoginRequestDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.HttpMediaTypeNotSupportedException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CustomUsernamePasswordAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private final ObjectMapper om;

    private static final String CONTENT_TYPE = "application/json";
    private static final AntPathRequestMatcher DEFAULT_ANT_PATH_REQUEST_MATCHER = new AntPathRequestMatcher("/login",
            "POST");

    public CustomUsernamePasswordAuthenticationFilter(ObjectMapper om) {
        super(DEFAULT_ANT_PATH_REQUEST_MATCHER);
        this.om = om;
    }

    public CustomUsernamePasswordAuthenticationFilter(AuthenticationManager authenticationManager, ObjectMapper om) {
        super(DEFAULT_ANT_PATH_REQUEST_MATCHER, authenticationManager);
        this.om = om;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        if (request.getContentType() == null || !request.getContentType().equals(CONTENT_TYPE)) {
            // Content-type이 맞지 않음 예외 발생
            throw new HttpMediaTypeNotSupportedException("application/json 요청이 아님");
        }

        LoginRequestDto loginRequestDto = om.readValue(request.getInputStream(), LoginRequestDto.class);
        String username = loginRequestDto.getUsername();
        String password = loginRequestDto.getPassword();

        if (username == null || password == null) {
            // 예외 발생
            throw new IllegalArgumentException("username, password 중 하나가 null");
        }

        UsernamePasswordAuthenticationToken authRequest = UsernamePasswordAuthenticationToken.unauthenticated(username, password);
        setDetails(request, authRequest);

        return this.getAuthenticationManager().authenticate(authRequest);
    }

    protected void setDetails(HttpServletRequest request, UsernamePasswordAuthenticationToken authRequest) {
        authRequest.setDetails(this.authenticationDetailsSource.buildDetails(request));
    }
}
