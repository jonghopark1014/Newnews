package com.newnews.newnews_be.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.newnews.newnews_be.dto.LoginResponseDto;
import com.newnews.newnews_be.entity.User;
import com.newnews.newnews_be.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class CustomAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final ObjectMapper om;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("유저 없음")
        );

        response.setStatus(HttpStatus.OK.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        LoginResponseDto loginResponseDto = new LoginResponseDto(user.getId());

        response.getWriter().write(om.writeValueAsString(loginResponseDto));
    }
}
