import { SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";

export const MAIN_NEWS_DETAIL = '/main/detail';

const API_URL = '/api/news/details';

const fetcher = (newsId: number) => axios.get(SERVER_URL + API_URL + `/${newsId}`).then(({ data }) => data);

/**
 * userId: useQuery안에 fetcher(axios요청)에 넣을 파라미터 값(들)
 * return이 useMainNewsAfter로 들어가므로 useMainNewsAfter.data 등등으로 쓰면 됩니닷. 
 * @param newsId 
 * @returns [data, dataUpdatedAt, error, errorUpdatedAt, failureCount, failureReason, isError, isFetched, isFetchedAfterMount, isFetching, isPaused, isLoading, isLoadingError, isPlaceholderData, isPreviousData, isRefetchError, isRefetching, isInitialLoading, isStale, isSuccess, refetch, remove, status, fetchStatus]
 */
const useMainNewsDetail = (newsId: number) => {
    // useQuery의 첫 번째 파라미터는 query key, query는 쿼리문마다 달라야함(주의!!), 쿼리를 보내는 트리거라고 생각하면 됨
    return useQuery([MAIN_NEWS_DETAIL], () => fetcher(newsId), {
        // staleTime: 데이터 요청을 보내는 시간 간격(ms)
        // cacheTime: 데이터를 캐시에 저장할 시간(ms), 데이터 요청을 보내오는 동안 캐시에 저장된 데이터를 보여줌
        // 다른 옵션은 그대로 써도 될 것 같아유.
        // refetchOnWindowFocus: 브라우저 창이 포커스될 때 데이터를 자동으로 다시 가져올지 여부를 설정합니다. 이 값을 false로 설정하면 창 포커스에 따른 자동 갱신이 비활성화됩니다.
        // refetchOnReconnect: 인터넷 연결이 다시 활성화될 때 데이터를 자동으로 다시 가져올지 여부를 설정합니다. 이 값을 false로 설정하면 인터넷 연결 상태에 따른 자동 갱신이 비활성화됩니다.
        staleTime: 0, cacheTime: 60 * 5 * 1000,
        refetchOnWindowFocus: false, refetchOnReconnect: false
    });
}

export default useMainNewsDetail;