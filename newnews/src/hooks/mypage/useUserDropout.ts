import { SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useMutation } from "react-query";

const API_URL = '/api/user';

const fetcher = (variables: { userId: number, password: string}) => axios.post(SERVER_URL + API_URL, { userId: variables.userId, password: variables.password }).then(({ data }) => data)


// 공부 : https://devkkiri.com/post/b3fe8ba3-46df-4cf0-b260-2c862628c0d9
/**
 * 후속 뉴스 표지
 * @returns 
 */
const useUserDropout = () => {
    return useMutation(fetcher, {
        onSuccess: (data) => {
            console.log('탈퇴성공', data);
        },
        onError: (error) => {
            console.log('탈퇴에러', error);
        }
    });
}

export default useUserDropout;