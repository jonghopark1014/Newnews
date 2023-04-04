import { useEffect } from "react";
import { isError, useQuery } from "react-query";
import axios from "axios";

import { SERVER_URL } from "@/utils/urls";
import { RiH3 } from "react-icons/ri";

const API_URL = '/api/news/category';
// {카테고리이름}?page=?&size=?

const fetcher = (categoryId: number | undefined) => axios.get(SERVER_URL + API_URL + `/${categoryId}`).then(({ data }) => data);

/**
 * userId: useQuery안에 fetcher(axios요청)에 넣을 파라미터 값(들)
 * return이 useMainNewsAfter로 들어가므로 useMainNewsAfter.data 등등으로 쓰면 됩니닷. 
 * @param categoryId 
 * @returns [data, dataUpdatedAt, error, errorUpdatedAt, failureCount, failureReason, isError, isFetched, isFetchedAfterMount, isFetching, isPaused, isLoading, isLoadingError, isPlaceholderData, isPreviousData, isRefetchError, isRefetching, isInitialLoading, isStale, isSuccess, refetch, remove, status, fetchStatus]
 */
const useMaincategoryNews = (categoryId: number | undefined) => {
            
            const {data, error, isLoading, refetch, ...res} = useQuery("newsData", () => fetcher(categoryId), {
                
                staleTime: 0, cacheTime: 60 * 5 * 1000,
                refetchOnWindowFocus: true, refetchOnReconnect: false
            });

            useEffect(() => {
                refetch()
            }, [categoryId])
            
            if (error) {
                
            }
            if (isLoading) {

            } else{
                console.log(`${categoryId}`, data)
                return data 
            }
    }


export default useMaincategoryNews;