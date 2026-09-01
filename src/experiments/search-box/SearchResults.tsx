import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Props = {
  query: string;
  dark: boolean;
};

type Result = {
  pageid: number;
  title: string;
  thumbnail?: { source: string };
  terms?: { description?: string[] };
};

export default function SearchResults({ query, dark }: Props) {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) return setResults([]);

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const url =
          `https://en.wikipedia.org/w/api.php?action=query&generator=search` +
          `&gsrsearch=${encodeURIComponent(query)}&gsrlimit=3` +
          `&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=140` +
          `&wbptterms=description&format=json&origin=*`;

        const res = await fetch(url);
        const data = await res.json();

        setResults(Object.values(data.query?.pages || {}));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!query.trim()) return null;

  return (
    <div
      className={`absolute top-[66px] left-1/2 -translate-x-1/2
      w-[520px] p-2 rounded-[20px] z-30 border
      ${dark
        ? "bg-[#181818] border-white/[0.05] shadow-[0_18px_40px_rgba(0,0,0,.4)]"
        : "bg-[#ececec] border-black/[0.05] shadow-[0_18px_36px_rgba(0,0,0,.12)]"
      }`}
    >
      {loading && (
        <div
          className={`h-[58px] flex items-center px-3 text-sm
          ${dark ? "text-[#777]" : "text-[#999]"}`}
        >
          Searching...
        </div>
      )}

      {!loading &&
        results.map((item) => (
          <div
            key={item.pageid}
            className={`h-[64px] px-3 flex items-center gap-3 rounded-[15px]
            mb-1.5 last:mb-0 border
            ${dark
              ? "bg-[#222] border-white/[0.05]"
              : "bg-[#e8e8e8] border-black/[0.05]"
            }`}
          >
            <div
              className={`w-[46px] h-[46px] shrink-0 rounded-[12px] overflow-hidden border
              ${dark
                ? "bg-[#2b2b2b] border-white/[0.05]"
                : "bg-[#d8d8d8] border-black/[0.05]"
              }`}
            >
              {item.thumbnail && (
                <img
                  src={item.thumbnail.source}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p
                className={`text-[15px] font-semibold truncate
                ${dark ? "text-[#f1f1f1]" : "text-[#374151]"}`}
              >
                {item.title}
              </p>

              <p
                className={`text-[12px] mt-0.5 truncate
                ${dark ? "text-[#777]" : "text-[#8d939d]"}`}
              >
                {item.terms?.description?.[0] || "Wikipedia result"}
              </p>
            </div>

            <ArrowUpRight
              size={17}
              strokeWidth={1.6}
              className={`shrink-0 mr-1
              ${dark ? "text-[#777]" : "text-[#707782]"}`}
            />
          </div>
        ))}
    </div>
  );
}