import { SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const API_URL = '/api/news/details/relatedNews';

const fetcher = (variables: { newsId: number, preNewsId: number }) => axios.post(SERVER_URL + API_URL,{ newsId: variables.newsId, preNewsId: variables.preNewsId } ).then(({ data }) => data)

// 공부 : https://devkkiri.com/post/b3fe8ba3-46df-4cf0-b260-2c862628c0d9
const useMainNewsRelated = () => {
    return useMutation(fetcher, {
        onSuccess: (data) => {
            console.log('연관뉴스내용성공', data);
        },
        onError: (error) => {
            console.log('연관뉴스내용에러', error);
        }
    });
}

export default useMainNewsRelated;