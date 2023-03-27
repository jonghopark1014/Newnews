import { SERVER_URL } from "@utils/urls";
import axios from "axios";
import { useQuery } from "react-query";

export const MAIN_NEWS = '/main';

const API_URL = '/news/after';

const fetcher = (userId: number) => axios.get(SERVER_URL + API_URL, { params: { userId: userId } }).then(({ data }) => data)

// 페이지 들어왔을때만 query
const useMainNewsAfter = (userId: number) => {
    return useQuery([MAIN_NEWS], () => fetcher(userId), {
        staleTime: 0, cacheTime: 60 * 5 * 1000,
        refetchOnWindowFocus: false, refetchOnReconnect: false
    });
}

export default useMainNewsAfter;