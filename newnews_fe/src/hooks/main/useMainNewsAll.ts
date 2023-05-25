import { SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const API_URL = '/api/news/';

const fetcher = (variables: { category: string}) => axios.post(SERVER_URL + API_URL + `/${variables.category}`).then(({ data }) => data);

// 공부 : https://devkkiri.com/post/b3fe8ba3-46df-4cf0-b260-2c862628c0d9
const useMainNewsAll = () => {
    return useMutation(fetcher, {
        onSuccess: (data, variables) => {
        },
        onError: (error, variables) => {
        }
    });
}

export default useMainNewsAll;