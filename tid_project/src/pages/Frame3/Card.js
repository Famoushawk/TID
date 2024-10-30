import React from "react";

function Card({type, date}){
    return (
    <button className="flex flex-col flex-1 shrink whitespace-nowrap basis-0 max-w-[220px] min-h-[160px] min-w-[120px] hover:bg-gray-300 rounded">
      <img loading="lazy" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtjx5nRnRUiIM-RtBAaIXxC8obxkAbwuSxug&s" alt="" className="object-contain rounded-2xl aspect-[1.12] w-[134px] p-1" />
      <div className="flex flex-col mt-1 w-full">
        <h3 className="text-sm font-medium tracking-normal leading-5 text-ellipsis text-zinc-900">
          {type}
        </h3>
        <time className="text-xs tracking-wide leading-4 text-ellipsis text-zinc-700">
          {date}
        </time>
      </div>
    </button>
    )
}

export default Card;