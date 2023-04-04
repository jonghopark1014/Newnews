import { useQuery } from "react-query";
import axios from "axios";
import { useRecoilState } from "recoil";

import { SERVER_URL } from "@/utils/urls";
import { topicAtom, topicStateType } from "@/stores/NewsTopics";

const API_URL = '/api/news/category';
// {카테고리이름}?page=?&size=?

const fetcher = (categoryId: number, page: number, size: number) => axios.get(SERVER_URL + API_URL + `/${categoryId}`, {params: {page: page, size: size}}).then(({ data }) => data);

/**
 * userId: useQuery안에 fetcher(axios요청)에 넣을 파라미터 값(들)
 * return이 useMainNewsAfter로 들어가므로 useMainNewsAfter.data 등등으로 쓰면 됩니닷. 
 * @param categoryId 
 * @returns [data, dataUpdatedAt, error, errorUpdatedAt, failureCount, failureReason, isError, isFetched, isFetchedAfterMount, isFetching, isPaused, isLoading, isLoadingError, isPlaceholderData, isPreviousData, isRefetchError, isRefetching, isInitialLoading, isStale, isSuccess, refetch, remove, status, fetchStatus]
 */
const useMaincategoryNews = (page: number, size: number) => {
    const [topicState, set] = useRecoilState<topicStateType>(topicAtom)
    const categoryName: Record<string, number>= {
        "연관뉴스" : 1,
        "경제" : 1,
        "정치" : 2,
        "사회" : 3,
        "생활/문화" : 4,
        "IT/과학" : 5,
    }

    return useQuery(["newsData", topicState.focused], () => fetcher(categoryName[topicState.focused], page, size), {
        staleTime: 0, cacheTime: 0,
        refetchOnWindowFocus: true, refetchOnReconnect: false
    });
}


export default useMaincategoryNews;