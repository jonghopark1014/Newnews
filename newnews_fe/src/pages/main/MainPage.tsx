import { MainPageTab } from "@/components/mainpage/MainPageTab";
import { MainPageContent } from "./MainPageContent";
import { useRecoilValue } from 'recoil';
import { LoginState } from '@/states/LoginState';
import { MobileChk } from "@/hooks/MobileChk";

export function MainPage(){
    const isLogin = useRecoilValue(LoginState)
    var isMobile = false;
    
    isMobile = MobileChk()
    
    return (
        <div className="main-page">
            <MainPageTab />
            <MainPageContent />
        </div>
    )
}