import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { LoginState } from '@/states/LoginState';

import { ArticleCard } from "@/components/ArticleCard";
import useBookmarkList from "@/hooks/bookmark/useBookmarkList";

interface DropImgProps{
    url : string, 
    description : string,
}

interface Iporps{
    id: number ,
    newsImageList: Array<DropImgProps>,
    title: string,
    width: number,
    height: number,
}

/**
 * 데이터를 불러와 map함수로 하나하나씩 나열해준다
 * @returns 북마크 페이지 
 */
export function BookMarkPage(){

    const [NewsData, setData] = useState<Iporps[]>()

    const isLogin = useRecoilValue(LoginState);
    // 로그인되어있는지 확인
    const isLogBoolean = isLogin[0]?.isLogin
    // 아이디 
    const isLog = isLogin[0].id
    // bookmark hook
    const bookmarkList = useBookmarkList()
    

    useEffect(()=> {
        bookmarkList.mutate({ userId: isLog }, {
            onSuccess : (data) => {
                setData(data.data)
            }
        })
    }, [])

    return (
        <div>
            {NewsData && NewsData.map((item, index) =>
                <ArticleCard key={index} title={item.title} id={item.id} url={item.newsImageList[0].url} width={100} height={200} />
                )}
        </div>
    )
}