import React from 'react'
import noData from "../../assets/react.svg";
import notFound from "../../assets/search-not-found.svg"


const EmptyCard = ({type, message}) => {
  return (
    <div className='flex flex-col justify-center items-center px-4 py-20 bg-white'>
      <img src={type == 'noData' ? noData : notFound} alt="No data" className='w-96 '/>
      <p className='w-1/2 text-sm  font-medium text-slate-700 text-center leading-7 mt-5'>{message}</p>
    </div>
  )
}

export default EmptyCard
