import { SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const API_URL = '/api/notification/delete';

const fetcher = (variables: { userId: number | null | undefined, newsId : number | null | undefined }) => axios.delete(SERVER_URL + API_URL + `/${variables.userId}/${variables.newsId}` ).then(({ data }) => data)

// 공부 : https://devkkiri.com/post/b3fe8ba3-46df-4cf0-b260-2c862628c0d9
const useBellDelete = ( userId: number | null | undefined, newsId : number | null | undefined ) => {
    return useMutation(fetcher, {
        onSuccess: (data) => {
        },
        onError: (error) => {
        }
    });
}

export default useBellDelete;