import { SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const API_URL = '/api/news/bookmark';

const fetcher = (variables: { userId: number| null | undefined, newsId: number }) => axios.post(SERVER_URL + API_URL,{ userId: variables.userId, newsId: variables.newsId } ).then(({ data }) => data)

// 공부 : https://devkkiri.com/post/b3fe8ba3-46df-4cf0-b260-2c862628c0d9
const useAddBookmark = () => {
    return useMutation(fetcher, {
        onSuccess: (data) => {
            console.log('북마크성공', data);
        },
        onError: (error) => {
            console.log('북마크에러', error);
        }
    });
}

export default useAddBookmark;