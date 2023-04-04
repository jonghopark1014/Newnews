import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from 'recoil';
import { LoginState } from '@/states/LoginState';
import styles from '@/styles/mypage/MyPage.module.scss';
import { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";

export function MyPage(){
    const navigate = useNavigate()
    const [alarm, setAlarm] = useState<null | string>(null);

    const isLogin = useRecoilValue(LoginState)
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
    const defaultTopics = ["정치", "경제", "사회", "생활/문화", "IT/과학", "세계", "국내축구", "해외축구", "연예"];

    useEffect(() => {
        if (!isLogin[0]?.isLogin) {
            setAlarm('로그인이 필요한 페이지 입니다')
            navigate('/login');
        }
    }, [isLogin, navigate])

    const onClickLogout = () =>{
        setIsLoggedIn([{isLogin: false, username: null, password: null, id: null}])
    }
    
    useEffect(()=>{
        const len = defaultTopics.length;
        const degree = 360 / len;

        for (let i = 1; i <= len; i++) {
            const line = document.querySelector<HTMLElement>(`.${styles.line}:nth-child(${i})`);
            console.log(degree);
            if (line) {
                line.style.transform = `rotate(${(i - 1) * degree}deg)`;
            }
        }
        
    }, []);
    
    return (
        <section className={styles.mypage}>
            <Link to="/login">mypage</Link>
            <BiLogOut onClick={() => {onClickLogout()}} />
            <div className={styles.content}>
                <p>성향</p>
                {defaultTopics.map((topic, index)=>{ return <div key={index} className={styles.line}><p>{topic}</p></div>})}
            </div>
            <div className={styles.dropout}>
                <button>탈퇴하기</button>
            </div>
            {alarm && 
                <div className={styles.alarm}>
                    <h3>{alarm}</h3>
                </div>}
        </section>
    )
}