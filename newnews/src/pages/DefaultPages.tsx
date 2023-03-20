import { Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer';

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
            <Outlet />
            <Footer />
        </div>
    );
}

export function BookMarkDefaultPage(){
    return(
        <div>
            <Outlet />
            <Footer />
        </div>
    );
}

export function MyDefaultPage(){
    return(
        <div>
            <Outlet />
            <Footer />
        </div>
    );
}