import { Link } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { LoginState } from '@/states/LoginState';


export function MyPage(){
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
    
    return (
        <section >
            <Link to="/login">mypage</Link> 
        </section>
    )
}