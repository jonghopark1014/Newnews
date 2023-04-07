import { useGoogleLogin } from '@react-oauth/google'
import googleIcon from "@/assets/singup.png";

export function GoogleLogin() {
    const REST_API_KEY = '758949398062-ossaflmuh3pmgl7igje8cvqmgf9cpoi1.apps.googleusercontent.com'
    const REDIRECT_URI = "http://localhost:5173/oauth/callback/google"
    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20openid&response_type=code&redirect_uri=${REDIRECT_URI}&client_id=${REST_API_KEY}`
    
    const googleSocialLogin = useGoogleLogin({
        flow: 'auth-code',
    })
    return(
        <div>
            <div>
                <a id="kakao-login-btn" href={GOOGLE_AUTH_URL}>
                    <img src="shortcut icon" width="191"
                        alt="구글 로그인 버튼" />
                </a>
                <p id="token-result"></p>
            </div>
            <div className='social_login_box google' onClick={() => googleSocialLogin()}>
                <div className='social_login_image_box'>
                <img src={googleIcon} alt='google_login' />
                </div>
                <div className='social_login_text_box'>구글로 시작하기</div>
                <div className='social_login_blank_box'> </div>
            </div>
        </div>
    )
}