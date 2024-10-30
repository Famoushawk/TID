import React from "react";

//Import profile picture and username
function ProfileBar() {
    return (
      <section className="flex gap-2 self-start p-4 bg-primary ml-1">
          <img
          src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS59s6qBOFlkS5LN4Z0U3G71nCWWg3SuHGVMw&s"}
          alt={"No image"}
          className={'w-[84px] aspect-[1.05] rounded-full'} />
          <div className="w-[106px] aspect-[6.25] my-auto" >Username</div> 
      </section>
    );
  }
  
  export default ProfileBar;