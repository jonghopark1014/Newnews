package com.ssafy.specialization.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.specialization.repository.UserRepository;
import com.ssafy.specialization.security.auth.CustomAuthenticationProvider;
import com.ssafy.specialization.security.auth.PrincipalDetailsService;
import com.ssafy.specialization.security.filter.CustomExceptionHandlingFilter;
import com.ssafy.specialization.security.filter.CustomUsernamePasswordAuthenticationFilter;
import com.ssafy.specialization.security.handler.CustomAuthenticationFailureHandler;
import com.ssafy.specialization.security.handler.CustomAuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final ObjectMapper om;
    private final PrincipalDetailsService principalDetailsService;
    private final UserRepository userRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .cors().configurationSource(corsConfiguration());

        http
            .authorizeRequests()
            .antMatchers("/api/regist").permitAll()
            .anyRequest().permitAll();

        http
            .formLogin().disable()
            .logout()
            .logoutUrl("/api/logout")
            .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler());

        http
            .apply(new MyCustomFilter());

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    private class MyCustomFilter extends AbstractHttpConfigurer<MyCustomFilter, HttpSecurity> {
        @Override
        public void configure(HttpSecurity http) {
            AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);

            CustomUsernamePasswordAuthenticationFilter customUsernamePasswordAuthenticationFilter = new CustomUsernamePasswordAuthenticationFilter(authenticationManager, om);
            customUsernamePasswordAuthenticationFilter.setFilterProcessesUrl("/api/login");
            customUsernamePasswordAuthenticationFilter.setAuthenticationSuccessHandler(new CustomAuthenticationSuccessHandler(userRepository, om));
            customUsernamePasswordAuthenticationFilter.setAuthenticationFailureHandler(new CustomAuthenticationFailureHandler());

            http.addFilterAfter(customUsernamePasswordAuthenticationFilter, LogoutFilter.class);
            http.addFilterBefore(new CustomExceptionHandlingFilter(), CustomUsernamePasswordAuthenticationFilter.class);
            http.addFilterBefore(new CustomLogFilter(), SecurityContextPersistenceFilter.class);

            http.authenticationProvider(new CustomAuthenticationProvider(principalDetailsService, passwordEncoder()));
        }
    }

    @Bean
    public CorsConfigurationSource corsConfiguration() {
        CorsConfiguration cors = new CorsConfiguration();

        cors.setAllowedOrigins(Arrays.asList("https://localhost:3000", "http://localhost:3000", "https://j8b309.p.ssafy.io"));
        cors.setAllowedHeaders(Arrays.asList("*"));
        cors.setAllowedMethods(Arrays.asList("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cors);
        return source;
    }
}
