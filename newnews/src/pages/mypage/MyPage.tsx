import { useEffect, useState, PureComponent, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from 'recoil';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { BiLogOut } from "react-icons/bi";

import { Button } from "@/components/Button";
import MemberShipModal from "@/components/membership/MemberShipModal";
import Modal from "@/components/bell/Modal";
import useUserDropout from "@/hooks/mypage/useUserDropout";
import useUserTendency from "@/hooks/mypage/useUserTendency";
import { LoginState } from '@/states/LoginState';

import styles from '@/styles/mypage/MyPage.module.scss';

interface info {
    id: string,
    sex: string,
    age: string,
}

const SEC = 2

export function MyPage(){
    const navigate = useNavigate()
    const [alarm, setAlarm] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false)
    const [myInfo, setMyInfo] = useState<info | null>(null)
    const isLogin = useRecoilValue(LoginState)
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
    const userId = isLogin[0].id
    const password = isLogin[0].password
    const userDropout = useUserDropout(userId, password)
    // 성향
    const useTendency = useUserTendency(userId);
    let sum = Object.values(useTendency).reduce(function add(sum, currValue) {
        return sum + currValue
    }, 0)
    console.log(sum)
    const data = [
        {
            subject: '경제',
            A: useTendency["economyNews"] / sum * 100,
            fullMark: 150,
        },
        {
            subject: '정치',
            A: useTendency["politicsNews"] / sum * 100,
            fullMark: 150,
        },
        {
            subject: '사회',
            A: useTendency["societyNews"] / sum * 100,
            fullMark: 150,
        },
        {
            subject: '생활/문화',
            A: useTendency["lifeAndCultureNews"] / sum * 100,
            fullMark: 150,
        },
        {
            subject: 'IT/과학',
            A: useTendency["itAndScienceNews"] / sum * 100,
            fullMark: 150,
        },
    ];
    useEffect(() => {
        if (!isLogin[0]?.isLogin) {
            setAlarm(!alarm)
            setTimeout(()=>{
                setAlarm(!alarm);
                navigate('/login');
            }, SEC * 1000)
        }
    }, [isLogin, navigate])

    const modalHandle = () => {
        return setModal(!modal)
    }
    const onClickWithdrawal = () =>{
        // userDropout.mutate({ userId: userId, password: password})
        // navigate('/')
    }

    const onLoginToggleModal = useCallback (() => {
            setAlarm(!alarm);
    }, [alarm])

    const onClickLogout = () =>{
        localStorage.clear()
        setIsLoggedIn([{isLogin: false, username: null, password: null, id: null}])
    }
    
    return (
        <section className={styles.mypage}>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <Radar name="Mike" dataKey="A" stroke="#0096ED" fill="#0096ED" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
            <div>
                <Button children="탈퇴하기" width={100} onClick={()=>{modalHandle()}} onKeyDown={()=>{}}></Button>
                <Button children="로그아웃" width={100} onClick={()=>{onClickLogout()}} onKeyDown={()=>{}}></Button>
            </div>
            {modal && <Modal children={"정말로 탈퇴하시겠습니까?"} onClickToggleModal={modalHandle} onClickChoice={onClickWithdrawal}/>}
            {alarm && <MemberShipModal children={"로그인이 필요한 페이지 입니다. 로그인 페이지로 이동합니다."} onClickToggleModal={onLoginToggleModal}/>}
        </section>
    )
}