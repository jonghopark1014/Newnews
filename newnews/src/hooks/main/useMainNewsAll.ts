import { SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const API_URL = '/api/news/';

const fetcher = (variables: { category: string}) => axios.post(SERVER_URL + API_URL + `/${variables.category}`).then(({ data }) => data);

// 공부 : https://devkkiri.com/post/b3fe8ba3-46df-4cf0-b260-2c862628c0d9
const useMainNewsAll = () => {
    return useMutation(fetcher, {
        onSuccess: (data) => {
            console.log('카테고리뉴스성공', data);
        },
        onError: (error) => {
            console.log('카테고리뉴스에러', error);
        }
    });
}

export default useMainNewsAll;