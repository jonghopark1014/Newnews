import { topicAtom } from "@/stores/NewsTopics";
import { useEffect } from "react";

import axios from "axios";

import { SERVER_URL } from "@/utils/urls";
import { RiH3 } from "react-icons/ri";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";

const API_URL = '/api/news/category';
// {카테고리이름}?page=?&size=?

const fetcher = (categoryId: number, page: number, size: number) => axios.get(SERVER_URL + API_URL + `/${categoryId}`, {params: {page: page, size: size}}).then(({ data }) => data);

/**
 * userId: useQuery안에 fetcher(axios요청)에 넣을 파라미터 값(들)
 * return이 useMainNewsAfter로 들어가므로 useMainNewsAfter.data 등등으로 쓰면 됩니닷. 
 * @param categoryId 
 * @returns [data, dataUpdatedAt, error, errorUpdatedAt, failureCount, failureReason, isError, isFetched, isFetchedAfterMount, isFetching, isPaused, isLoading, isLoadingError, isPlaceholderData, isPreviousData, isRefetchError, isRefetching, isInitialLoading, isStale, isSuccess, refetch, remove, status, fetchStatus]
 */
const useMaincategoryNews = (categoryId: number, page: number, size: number) => {
    console.log('됨?', categoryId, page, size)
    const {data, isSuccess, isError, isLoading, refetch} =  useQuery(["newsData"], () => fetcher(categoryId, page, size), {
        staleTime: 0, cacheTime: 0,
        refetchOnWindowFocus: false, refetchOnReconnect: false
    });
    useEffect(() =>{
        refetch()
    },[categoryId, page, size])
    if (isSuccess) {
        return data
        
    }
}


export default useMaincategoryNews;