import React from "react";

function AddButton(){
    return (
        <button className="flex overflow-hidden justify-center items-center w-12,5 h-12,5 rounded-2xl bg-secondary">
      <div className="flex justify-center items-center self-stretch p-4 my-auto w-14">
        <img loading="lazy" src="https://cdn.icon-icons.com/icons2/916/PNG/512/Plus_icon-icons.com_71848.png" alt="" className="object-contain self-stretch my-auto w-6 aspect-square" />
      </div>
    </button>
    )
}

export default AddButton;