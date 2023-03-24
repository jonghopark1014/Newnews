export function KakaoLogin() {
    const REST_API_KEY = '5317e0638f8f88c67b9615a25adf06fa'
    const REDIRECT_URI = "http://localhost:5173/oauth/callback/kakao"
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

    return(
        <div>
            <a id="kakao-login-btn" href={KAKAO_AUTH_URL}>
                <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="191"
                    alt="카카오 로그인 버튼" />
            </a>
            <p id="token-result"></p>
        </div>
    )
}
