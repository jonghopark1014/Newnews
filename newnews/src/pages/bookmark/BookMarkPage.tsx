import { useEffect, useState } from 'react'
import { ArticleCard } from "@components/ArticleCard";
import axios from "axios";

interface Iporps{
    onClick: void
}


/**
 * 데이터를 불러와 map함수로 하나하나씩 나열해준다
 * @returns 북마크 페이지 
 */
export function BookMarkPage(props: Iporps){
    
    const [NewsData, setData] = useState([])

    // useEffect(()=> {
    //     axios.get(``, {})
    //         .then((response) =>{
    //             const responseData = response.data
    //             console.log(response.data)
    //             setData(responseData)
    //         })
    //         .catch((error) =>{
    //             console.log(error)
    //         })
    // }, [])

    return (
        <div>
            {NewsData.map(item =>
                // <ArticleCard width={100} height={200} title={item.title} url={item.Img} id={item}/>
                <ArticleCard width={100} height={200} />
                )}
                <ArticleCard width={100} height={200} />
        </div>
    )
}