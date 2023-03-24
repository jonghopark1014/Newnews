import { Button } from "@components/Button";
import styles from "@/styles/login/Login.module.scss"
import { useState } from "react";
import { KakaoLogin } from "@/components/login/Kakao";

export function LoginPage() {
    const [inputs, setInputs] = useState('');
    /**
     * 
     * @param e input값을 실시간으로 보여주는 값
     */
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInputs(e.target.value);
    console.log(e.target.value)
    };

    return(
        <div>
            {/* 아이디 입력과 비밀번호 입력 */}
            <div className={styles.inputSytle}>
                <input className={styles.idInput} 
                type="text" placeholder="아이디를 입력해주세요" onChange={onChange}/>
                <input className={styles.pwInput} 
                type="text" placeholder="비밀번호를 입력해주세요" onChange={onChange}/>
            </div>
            {/* 아이디저장 자동로그인 체크박스 */}
            <div className={styles.checkBox}>
                <input type="checkbox" name="" id="id" />
                <label htmlFor="">아이디 저장</label>
                <input type="checkbox" name="" id="" />
                <label htmlFor="">자동 로그인</label>
            </div>
            {/* 버튼 */}
            <div className={styles.buttonGrid}>
                <Button onClick={() => {}} children={"로그인 하기"}/>
            </div>
            <hr className={styles.hrStyles}/>
            {/* 소셜로그인 */}
            <div className={styles.snsGrid}>
            <KakaoLogin />
            </div>
            {/* 회원가입 | 아이디찾기 | 비밀번호 찾기 */}
            <div className={styles.modifyGrid}>

            </div>
        </div>
    )
}