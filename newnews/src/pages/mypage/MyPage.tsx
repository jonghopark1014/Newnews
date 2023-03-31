import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from 'recoil';
import { LoginState } from '@/states/LoginState';
import { useEffect } from "react";
import { BiLogOut } from "react-icons/bi";

export function MyPage(){
    const navigate = useNavigate()

    const isLogin = useRecoilValue(LoginState)
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
    console.log(isLogin)

    useEffect(() => {
        if (!isLogin[0].isLogin) {
            alert("로그인이 필요한 페이지 입니다. 로그인 페이지로 이동합니다.")
            navigate('/login');
        }
    }, [isLogin, navigate])

    const onClickLogout = () =>{
        setIsLoggedIn([{isLogin: false, username: null, password: null, id: null}])
    }


    return (
        <section >
            <Link to="/login">mypage</Link> 
            <BiLogOut onClick={() => {onClickLogout()}} />
        </section>
    )
}