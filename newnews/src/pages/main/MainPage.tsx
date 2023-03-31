import { MainPageTab } from "@/components/mainpage/MainPageTab";
import { MainPageContent } from "./MainPageContent";
import { useRecoilValue } from 'recoil';
import { LoginState } from '@/states/LoginState';


export function MainPage(){
    const isLogin = useRecoilValue(LoginState)

    return (
        <div className="main-page">
            <MainPageTab />
            <MainPageContent />
        </div>
    )
}