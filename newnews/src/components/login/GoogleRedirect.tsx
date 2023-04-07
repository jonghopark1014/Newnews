import React, { useEffect } from "react";
import axios from 'axios';

export const GoogleRedirect = () => {
    const code = new URL(window.location.href).searchParams.get("code")

    // useEffect(()=> {
    //     let grant_type = "authorization_code";
    //     let client_id = "5317e0638f8f88c67b9615a25adf06fa";

    //     axios.post(`https://kauth.kakao.com/oauth/token?
    //         grant_type=${grant_type}
    //         &client_id=${client_id}
    //         &redirect_uri=http://localhost:5173/oauth/callback/kakao
    //         &code=${code}`
    //         , {
    //     headers: {
    //         'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    //     }
    // }).then((res) => {
    //     // res에 포함된 토큰 받아서 원하는 로직을 하면된다.
    // })
    // }, [])

    return (
    <div>{code}</div>
    )
    };
