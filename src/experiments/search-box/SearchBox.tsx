import { useState } from "react";
import { Search, Moon, Sun } from "lucide-react";
import SearchResults from "./SearchResults";

export default function SearchBox() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");

  const theme = dark
    ? "bg-[#1d1d1d] text-white shadow-[0_12px_28px_rgba(0,0,0,.55)]"
    : "bg-[#ececec] text-[#374151] shadow-[0_12px_28px_rgba(0,0,0,.14)]";

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${dark ? "bg-[#161616]" : "bg-[#e8e8e8]"}`}>
      <div className="relative">
        <div className="relative flex items-center">
          <div
            className={`relative z-10 h-12 flex items-center rounded-full overflow-hidden ${theme}
            transition-[width,padding,background-color,color,box-shadow] duration-500 ease-in-out
            ${open ? "w-80 px-3" : "w-12 px-0"}`}
          >
            <button
              onClick={() => setOpen(!open)}
              className="min-w-12 h-12 flex items-center justify-center outline-none"
            >
              <Search size={20} />
            </button>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className={`min-w-0 bg-transparent outline-none border-none
              transition-[opacity,width,margin,color] duration-500
              ${dark ? "text-white placeholder:text-[#777]" : "text-[#374151] placeholder:text-[#9ca3af]"}
              ${open ? "opacity-100 w-full ml-1 delay-150" : "opacity-0 w-0 ml-0 pointer-events-none"}`}
            />
          </div>

          <button
            onClick={() => setDark(!dark)}
            className={`absolute right-0 w-12 h-12 rounded-full flex items-center justify-center ${theme}
            outline-none ring-0 focus:outline-none focus:ring-0
            transition-[transform,opacity,background-color,color,box-shadow] duration-500 ease-in-out
            ${open ? "translate-x-[66px] opacity-100 scale-100" : "translate-x-0 opacity-0 scale-75 pointer-events-none"}`}
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <SearchResults query={query} dark={dark} />
      </div>
    </div>
  );
}