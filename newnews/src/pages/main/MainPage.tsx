import { MainPageTab } from "@/components/mainpage/MainPageTab";
import { MainPageContent } from "./MainPageContent";


export function MainPage(){
    return (
        <div className="main-page">
            <MainPageTab />
            <MainPageContent />
        </div>
    )
}