import React from "react";

function SettingsButton(){
    return (
        <button className="flex flex-col max-w-[40px] m-4">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f40718e6da41294f035e41818bdec52408146f5125a6b7fa2b8ab2221e89006?placeholderIfAbsent=true&apiKey=d8134f90761a4e9db589863aef8c0d7c"
            className="object-contain w-full aspect-square fill-zinc-900"
            alt="Settings icon"
          />
        </button>
      );
}

export default SettingsButton;