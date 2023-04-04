import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from 'recoil';

import { BiLogOut } from "react-icons/bi";
import { LoginState } from '@/states/LoginState';

import styles from '@/styles/mypage/MyPage.module.scss';

interface info {
    id: string,
    sex: string,
    age: string,
}

const SEC = 3

export function MyPage(){
    const navigate = useNavigate()
    const [alarm, setAlarm] = useState<null | string>(null);
    const [myInfo, setMyInfo] = useState<info | null>(null)
    const isLogin = useRecoilValue(LoginState)
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
    const defaultTopics = ["경제", "정치", "사회", "생활/문화", "IT/과학"];

    useEffect(() => {
        if (!isLogin[0]?.isLogin) {
            setAlarm("로그인이 필요한 페이지 입니다. 로그인 페이지로 이동합니다.")
            setTimeout(()=>{
                setAlarm(null);
                navigate('/login');
            }, SEC * 1000)
        }
    }, [isLogin, navigate])

    const onClickLogout = () =>{
        setIsLoggedIn([{isLogin: false, username: null, password: null, id: null}])
    }
    
    useEffect(()=>{
        // 성향 관련 
        const len = defaultTopics.length;
        const degree = 360 / len;

        for (let i = 1; i <= len + 1; i++) {
            console.log(i)
            const line = document.querySelector<HTMLElement>(`.${styles.line}:nth-child(${i})`);
            console.log(line)
            if (line) {
                line.style.transform = `rotate(${(i) * degree - (90 - degree)}deg)`;
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
            {alarm && <div className="main-page-alarm"><h3>{alarm}</h3></div>}
        </section>
    )
}