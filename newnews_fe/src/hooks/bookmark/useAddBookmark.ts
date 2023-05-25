import { SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { MAIN_NEWS_DETAIL } from "../main/useMainNewsDetail";

const API_URL = '/api/news/bookmark';

const fetcher = (variables: { userId: number| null | undefined, newsId: number }) => axios.post(SERVER_URL + API_URL,{ userId: variables.userId, newsId: variables.newsId } ).then(({ data }) => data)

// 공부 : https://devkkiri.com/post/b3fe8ba3-46df-4cf0-b260-2c862628c0d9
const useAddBookmark = () => {
    const queryClient = useQueryClient();
    return useMutation(fetcher, {
        onSuccess: (data) => {
            queryClient.invalidateQueries(MAIN_NEWS_DETAIL, { refetchInactive: true });
        },
        onError: (error) => {
        }
    });
}

export default useAddBookmark;