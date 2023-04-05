import { useQuery } from "react-query";
import axios from "axios";

import { SERVER_URL } from "@/utils/urls";

const API_URL = '/fast/api/search';
// ?keyword={검색어}

const fetcher = (keyword : string) => axios.get(SERVER_URL + API_URL, {params: { keyword: keyword }}).then(({ data }) => data);

/**
 * 
 * @param keyword 검색할 키워드 
 * @returns [data, dataUpdatedAt, error, errorUpdatedAt, failureCount, failureReason, isError, isFetched, isFetchedAfterMount, isFetching, isPaused, isLoading, isLoadingError, isPlaceholderData, isPreviousData, isRefetchError, isRefetching, isInitialLoading, isStale, isSuccess, refetch, remove, status, fetchStatus]
 */
const useSearchKeyword = (keyword : string) => {
    // const [topicState, set] = useRecoilState<topicStateType>(topicAtom)
    // const categoryName: Record<string, number>= {
    //     "economy " : 1,
    //     "politics " : 2,
    //     "society" : 3,
    //     "lifeAndCulture" : 4,
    //     "itAndScience" : 5,
    // }

    return useQuery("keyword", () => fetcher(keyword), {
        staleTime: 0, cacheTime: 0,
        refetchOnWindowFocus: true, refetchOnReconnect: false
    });
}

export default useSearchKeyword;