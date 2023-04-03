import { SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const API_URL = '/api/news/after';

const fetcher = (variables: { userId: number | null | undefined, page: number, size: number }) => axios.post(SERVER_URL + API_URL, {}, { data : { userId: variables.userId }, params: { page: variables.page, size: variables.size}} ).then(({ data }) => data)


// 공부 : https://devkkiri.com/post/b3fe8ba3-46df-4cf0-b260-2c862628c0d9
/**
 * 후속 뉴스 표지
 * @returns 
 */
const useMainNewsAfter = () => {
    return useMutation(fetcher, {
        onSuccess: (data) => {
            console.log('연관뉴스성공', data);
        },
        onError: (error) => {
            console.log('연관뉴스에러', error);
        }
    });
}

export default useMainNewsAfter;