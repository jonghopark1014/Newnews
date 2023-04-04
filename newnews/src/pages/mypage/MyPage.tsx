import { useEffect, useState, PureComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from 'recoil';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

import { BiLogOut } from "react-icons/bi";
import { LoginState } from '@/states/LoginState';

import styles from '@/styles/mypage/MyPage.module.scss';
import { Button } from "@/components/Button";

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

    const data = [
        {
            subject: '경제',
            A: 120,
            fullMark: 150,
        },
        {
            subject: '정치',
            A: 98,
            fullMark: 150,
        },
        {
            subject: '사회',
            A: 86,
            fullMark: 150,
        },
        {
            subject: '생활/문화',
            A: 99,
            fullMark: 150,
        },
        {
            subject: 'IT/과학',
            A: 85,
            fullMark: 150,
        },
    ];
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
    
    return (
        <section className={styles.mypage}>
            <ResponsiveContainer width="90%" height="90%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <Radar name="Mike" dataKey="A" stroke="#0096ED" fill="#0096ED" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
            <div>
                <Button children="탈퇴하기" width={140} onClick={()=>{}} onKeyDown={()=>{}}></Button>
                <BiLogOut onClick={() => {onClickLogout()}} />
            </div>
            {alarm && 
                <div className={styles.alarm}>
                    <h3>{alarm}</h3>
                </div>}
        </section>
    )
}