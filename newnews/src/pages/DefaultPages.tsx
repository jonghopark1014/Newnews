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
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export function BookMarkDefaultPage(){
    return(
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export function MyDefaultPage(){
    return(
        <div>
            <Header />
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