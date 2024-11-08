function FiltersLine(){
    const filters = ['Blogs', 'Debate', 'Videos'];

    //Create a function to filter the values such that only blogs show when blogs are clicked
  
    return (
      <nav className="flex overflow-hidden flex-wrap gap-1 items-start pb-3 w-full text-sm font-medium tracking-normal leading-5 text-center text-zinc-700 max-md:px-5 max-md:max-w-full bg-white">
        {filters.map((filter, index) => (
          <button key={index} 
          className="flex overflow-hidden justify-center items-center whitespace-nowrap rounded-lg border border-solid border-stone-300 min-h-[32px] bg-white">
            <div className="gap-2 self-stretch px-4 py-1.5 my-auto min-h-[32px] bg-white hover:bg-gray-300">
            {filter} 
            </div>
          </button>
        ))}
      </nav>
    )
  }

  export default FiltersLine;