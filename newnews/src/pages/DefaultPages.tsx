import { Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

// OutLet에 main.tsx의 path에 해당하는 element의 children이 들어감
export function DefaultPage(){
    return(
        <div>
            <Outlet />
            <Footer />
        </div>
    );
}

export function SearchDefaultPage(){
    return(
        <div>
            <Header children={"logo"}/>
            <Outlet />
            <Footer />
        </div>
    );
}

export function BookMarkDefaultPage(){
    return(
        <div>
            <Header children={"내가 저장한 기사"}/>
            <Outlet />
            <Footer />
        </div>
    );
}

export function MyDefaultPage(){
    return(
        <div>
            <Header children={"마이페이지"}/>
            <Outlet />
            <Footer />
        </div>
    );
}

export function BellDefalutPage(){
    return(
        <div>
            <Outlet />
        </div>
    );
}
export function LoginDefalutPage(){
    return(
        <div>
            <Header children={"로그인"}/>
            <Outlet />
            <Footer />
        </div>
    );
}
export function MembershipDefalutPage(){
    return(
        <div>
            <Header children={"회원가입"}/>
            <Outlet />
            <Footer />
        </div>
    );
}