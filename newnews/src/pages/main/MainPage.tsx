import { MainPageTab } from "@/components/mainpage/MainPageTab";
import { MainPageContent } from "./MainPageContent";
import { useRecoilState } from 'recoil';
import { LoginState } from '@/states/LoginState';


export function MainPage(){
    
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
    return (
        <div className="main-page">
            <MainPageTab />
            <MainPageContent />
        </div>
    )
}