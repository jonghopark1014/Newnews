export function GoogleLogin() {
    const REST_API_KEY = 'AIzaSyAP-UO19Lo18Jie6yMvxWgHxyxSfDQ0vls'
    const REDIRECT_URI = "http://localhost:5173/oauth/callback/google"
    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20openid&response_type=code&redirect_uri=${REDIRECT_URI}&client_id=${REST_API_KEY}`

    return(
        <div>
            <a id="kakao-login-btn" href={GOOGLE_AUTH_URL}>
                <img src="" width="191"
                    alt="구글 로그인 버튼" />
            </a>
            <p id="token-result"></p>
        </div>
    )
}