import { Button } from "@/components/Button";
import styles from "@/styles/login/Login.module.scss"
import { useState } from "react";
// import { KakaoLogin } from "@/components/login/Kakao";
import { HiOutlineUsers, HiOutlineLockClosed } from "react-icons/hi"
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'
import {  } from 'react-kakao-login'
import { useNavigate } from "react-router-dom";



const REST_API_KEY = '758949398062-ossaflmuh3pmgl7igje8cvqmgf9cpoi1.apps.googleusercontent.com'

export function LoginPage() {
    const [inputs, setInputs] = useState('');
    const navigate = useNavigate()

    /**
     * 
     * @param e input값을 실시간으로 보여주는 값
     */
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInputs(e.target.value);
    console.log(e.target.value)
    };

    return(
        <div className={styles.container}>
            <div className={styles.block} />
            {/* 아이디 입력과 비밀번호 입력 */}
                <div className={styles.idInput}>
                    <HiOutlineUsers className={styles.icons}/>
                    <hr />
                    <input  
                    type="email" placeholder="아이디를 입력해주세요" onChange={onChange}/> 
                </div>
                <form className={styles.pwInput}>
                    <HiOutlineLockClosed className={styles.icons} />
                    <hr />
                    <input  
                    type="password" placeholder="비밀번호를 입력해주세요" autoComplete="off" onChange={onChange}/>
                </form>
            {/* 아이디저장 자동로그인 체크박스 */}
            <div className={styles.checkBox}>
                <input type="checkbox" name="" id="idSave" />
                <label htmlFor="">아이디 저장</label> 
                <input type="checkbox" name="" id="" />
                <label htmlFor="">자동 로그인</label>
            </div>
            {/* 버튼 */}
            <div className={styles.buttonGrid}>
                <Button width={150} onClick={() => {}} children={"로그인 하기"}/>
            </div>
            <hr className={styles.hrStyles}/>
            {/* 소셜로그인 */}
            <div className={styles.snsGrid}>
            {/* <KakaoLogin /> */}
                <GoogleOAuthProvider clientId={`${REST_API_KEY}`}>
                    <GoogleLogin onSuccess={(credentialRespose) =>{
                        console.log(credentialRespose)
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
        </div>
    )
}