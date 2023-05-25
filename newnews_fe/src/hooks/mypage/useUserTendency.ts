import { LoginState } from "@/states/LoginState";
import { SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

export const USER_TENDENCY = '/tendency';

const API_URL = '/api/user/tendency';

const fetcher = (userId: number | null | undefined) => axios.get(SERVER_URL + API_URL + `/${userId}`).then(({ data }) => data);

const useUserTendency = (userId: number | null | undefined) => {
    const [tendency, setTendency] = useState({
        "economyNews": 1,
        "politicsNews": 1,
        "societyNews": 1,
        "lifeAndCultureNews": 1,
        "itAndScienceNews": 1
    })
    useQuery([USER_TENDENCY], () => fetcher(userId), {
        staleTime: 0, cacheTime: 60 * 5 * 1000,
        refetchOnWindowFocus: false, refetchOnReconnect: false,
        onSuccess: (data)=>{
            setTendency(data.data)
        }
    });
    return tendency
}

export default useUserTendency;