"use client";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getFiles } from "@/lib/actions/file.action";
import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import FormattedDateAndTime from "./FormattedDateAndTime";
import { useDebounce } from "use-debounce";

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const searcParams = useSearchParams();
  const searchQuery = searcParams.get("query") || "";
  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const [debouncedQuery] = useDebounce(query, 1000);
  useEffect(() => {
    const fetchFiles = async () => {
      const params = new URLSearchParams(searcParams);

      if (debouncedQuery.length === 0) {
        params.delete("query"); // Remove only the query parameter
        setResults([]);
        setOpen(false);
      } else {
        params.set("query", debouncedQuery); // Update the query parameter
        const files = await getFiles({ types: [], searchText: debouncedQuery });
        setResults(files.documents);
        setOpen(true);
      }

      router.push(`${path}?${params.toString()}`, { scroll: false });
    };

    fetchFiles();
  }, [debouncedQuery, path, router, searcParams]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
      setOpen(false);
    }
  }, [searcParams, searchQuery]);

  const handleClickItem = (file: Models.Document) => {
    setOpen(false);
    setResults([]);

    const params = new URLSearchParams(searcParams);
    params.set("query", debouncedQuery); // Keep search query
    router.push(`/dashboard/${file.fileType}s?${params.toString()}`);
  };

  return (
    <div className="search">
      <div className="search-input-wrapper">
        <FaSearch className="text-2xl text-light-100 dark:text-light-400/50" />
        <Input
          value={query}
          // onBlur={() => setOpen(false)}
          // onFocus={() => setOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="search-input"
        />
        {open && (
          <ul className="search-result">
            {results.length > 0 ? (
              results.map((item) => (
                <li
                  onClick={handleClickItem.bind(this, item)}
                  className="flex items-center justify-between"
                  key={item.$id}
                >
                  <div className="flex cursor-pointer items-center gap-4">
                    <Thumbnail
                      type={item.fileType}
                      extention={item.extention}
                      url={item.url}
                    />
                    <p className="subtitle-2 line-clamp-1 text-light-100 dark:text-light-500">
                      {item.name}
                    </p>
                  </div>
                  <FormattedDateAndTime
                    date={item.$createdAt}
                    className="caption line-clamp-1 text-light-200 dark:text-light-500"
                  />
                </li>
              ))
            ) : (
              <p className="empty-result">No results found</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
