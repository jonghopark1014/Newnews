import { useQuery } from "react-query";
import axios from "axios";

import { SERVER_URL } from "@/utils/urls";

const API_URL = '/api/search';
// ?keyword={검색어}

const fetcher = () => axios.get( SERVER_URL + API_URL ).then(({ data }) => data);

/**
 * 
 * @param keyword 검색할 키워드 
 * @returns [data, dataUpdatedAt, error, errorUpdatedAt, failureCount, failureReason, isError, isFetched, isFetchedAfterMount, isFetching, isPaused, isLoading, isLoadingError, isPlaceholderData, isPreviousData, isRefetchError, isRefetching, isInitialLoading, isStale, isSuccess, refetch, remove, status, fetchStatus]
 */
const useSearchKeywordRank = () => {

    return useQuery("keywordRank", () => fetcher(), {
        staleTime: 0, cacheTime: 0,
        refetchInterval: false,
        refetchOnWindowFocus: true, refetchOnReconnect: false
    });
}

export default useSearchKeywordRank;