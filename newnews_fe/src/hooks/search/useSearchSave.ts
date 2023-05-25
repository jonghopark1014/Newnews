import { SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const API_URL = '/api/search/save';

const fetcher = (variables: { keyword: string, username : string | null | undefined }) => axios.post(SERVER_URL + API_URL,{ keyword: variables.keyword, username: variables.username}).then(({ data }) => data)

// 공부 : https://devkkiri.com/post/b3fe8ba3-46df-4cf0-b260-2c862628c0d9
const useSearchSave = ( ) => {
    return useMutation(fetcher, {
        onSuccess: (data) => {
        },
        onError: (error) => {
        }
    });
}

export default useSearchSave;