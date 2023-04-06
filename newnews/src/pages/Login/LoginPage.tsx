import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from 'recoil';
import { LoginState } from '@/states/LoginState';
import { HiOutlineUsers, HiOutlineLockClosed } from "react-icons/hi";
import axios from "axios";
import { useCookies } from "react-cookie"

import { SERVER_URL, REST_API_KEY } from "@/utils/urls"
import { Button } from "@/components/Button";
import MemberShipModal from "@/components/membership/MemberShipModal";
import { KakaoLogin } from "@/components/login/Kakao";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

// import {  } from 'react-kakao-login'

import styles from "@/styles/login/Login.module.scss"

const SEC = 1.5;

interface Iprops{
    username : string
    password : string
}

export function LoginPage() {
    const navigate = useNavigate()
    const API = `${SERVER_URL}/api/login`;
    const [cookies, setCookie, removeCookie] = useCookies(["rememberUserId"])
    const [checkBox, setCheckBox]= useState<boolean>(false)
    const [alarm, setAlarm] = useState<null | string>(null);
    
    //
    const isLogin = useRecoilValue(LoginState);
    const isLog = isLogin[0].isLogin
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

    // 로그인
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [isModal, setModal ] = useState<boolean>(false);

    const onClickToggleModal = useCallback(() => {
        setModal(!isModal);
    }, [isModal]);

    useEffect(() => {
        if (isLog) {
            setTimeout(()=>{
                navigate('/') },
                 SEC * 1000)
        } else {
            if (cookies.rememberUserId !== undefined) {
                setUsername(cookies.rememberUserId)
                setCheckBox(true)
            }}
    }, [isLogin, checkBox])

    async function onSubmitLogin({username, password}: Iprops) {
        try {
        await axios
            .post(API, {
            username: username,
            password: password,
            },
            {
                withCredentials: true,
            })
            .then((res) => {
                localStorage.clear()
                setIsLoggedIn([{isLogin: true, username: username, password:password, id: res.data.id}])
                localStorage.setItem('id', res.data.id)
                localStorage.setItem('token', res.data.token)
                setTimeout(()=> {
                    navigate("/");
                }, SEC * 1000);
            })
            } catch (err) {
                console.error(err)
            }
        }

    function keyDown (e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.code === "Enter") {
            e.preventDefault(); 
            onSubmitLogin({username, password})
        }
    }

    /**
     * 
     * @param e input값을 실시간으로 보여주는 값
     */
    const onChangeUsername = (e : React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };
    const onChangePassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    /**
     * 체크박스 true false
     * @param e 아이디저장 
     */
    const handleEchange = (e : React.FocusEvent<HTMLInputElement>) => {
        setCheckBox(e.target.checked)
        if (!e.target.checked) {
            removeCookie('rememberUserId')
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.block} />
            {/* 아이디 입력과 비밀번호 입력 */}
                <div className={styles.idInput}>
                    <HiOutlineUsers className={styles.icons}/>
                    <hr />
                    <input  
                    type="email" placeholder="아이디를 입력해주세요" value={username} onChange={onChangeUsername}/> 
                </div>
                <div className={styles.pwInput}>
                    <HiOutlineLockClosed className={styles.icons} />
                    <hr />
                    <input  
                    type="password" placeholder="비밀번호를 입력해주세요" autoComplete="off" value={password} onChange={onChangePassword} onKeyDown={keyDown}/>
                </div>
            {/* 아이디저장 자동로그인 체크박스 */}
            <div className={styles.checkBox}>
                <input type="checkbox" name="" id="saveId" onChange={handleEchange} checked={checkBox}/>
                <label htmlFor="saveId">아이디 저장</label> 
                <input type="checkbox" name="" id="" />
                <label htmlFor="">자동 로그인</label>
            </div>
            {/* 버튼 */}
            <div className={styles.buttonGrid}>
                <Button width={150} onClick={() => {onSubmitLogin({username, password})}} children={"로그인 하기"}/>
            </div>
            <hr className={styles.hrStyles}/>
            {/* 소셜로그인 */}
            <div className={styles.snsGrid}>
            <KakaoLogin />
                <GoogleOAuthProvider clientId={`${REST_API_KEY}`}>
                    <GoogleLogin onSuccess={(credentialRespose) =>{
                    }}
                    onError={() =>{
                        console.log('login Failed')
                    }}/>
                </GoogleOAuthProvider>
            </div>
            {/* 회원가입 | 아이디찾기 | 비밀번호 찾기 */}
            <div className={styles.modifyGrid}>
                <p onClick={() => (navigate('/membership'))}>회원가입 |</p>
                <p>아이디 찾기 |</p>
                <p>비밀번호 찾기</p>
            </div>
            {isLog && <MemberShipModal onClickToggleModal={onClickToggleModal} children="로그인 되어있습니다"/>}
        </div>
    )
}