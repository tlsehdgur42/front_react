import React, { useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const getNum = (param, defaultValue) =>{
    if(!param){
        return defaultValue
    }
    return parseInt(param)
}


// 커스텀 훅
const useCustomMove = () => {

    const navigate = useNavigate()
    const [refresh, setRrefresh] = useState(false)
    const [queryParams] = useSearchParams()
    
    const page = getNum(queryParams.get('page'), 1)
    const size = getNum(queryParams.get('size'), 10)

    const queryDefault = createSearchParams({page, size}).toString()

    const moveToList = (pageParam) =>{
        let queryStr = ""
        if(pageParam){
            const pageNum = getNum(pageParam.page, 1)
            const sizeNum = getNum(pageParam.page, 10)

            queryStr = createSearchParams({page:pageNum, size:sizeNum}).toString()
        }else{
            queryStr = queryDefault
        }

        setRrefresh(!refresh)
        navigate({pathname:`../list`, search:queryStr})
    }

    const moveToModify = (num) => {
        navigate({
            pathname:`../modify/${num}`,
            search: queryDefault //  수정시에 기존의 쿼리 스트링 유지를 위해
        })
    }

    const moveToRead = (num) => {
        console.log(queryDefault)
        navigate({
            pathname:`../read/${num}`,
            search: queryDefault //  수정시에 기존의 쿼리 스트링 유지를 위해
        })
    }


  return (
    {moveToList, moveToModify, moveToRead, page, size, refresh}
  );
}

export default useCustomMove;