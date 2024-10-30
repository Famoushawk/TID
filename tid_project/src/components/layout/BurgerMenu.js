function BurgerMenu() {
    return (
      <button className="flex flex-col justify-center items-center w-12 min-h-[48px]">
        <div className="flex overflow-hidden gap-2.5 justify-center items-center w-full max-w-[40px] rounded-[100px]">
          <div className="flex gap-2.5 justify-center items-center self-stretch p-2 my-auto w-10">
            <img loading="lazy" src="https://cdn-icons-png.flaticon.com/128/5358/5358649.png" alt="" className="object-contain self-stretch my-auto w-6 aspect-square" />
          </div>
        </div>
      </button>
    );
  }
  
  export default BurgerMenu;