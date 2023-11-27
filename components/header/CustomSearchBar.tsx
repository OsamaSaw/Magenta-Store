import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Autocomplete, Divider, Stack, TextField } from "@mui/material";

export const CustomSearchBar = ({
  searchSuggestions,
  setSearch,
  search,
  customClassName,
}: {
  searchSuggestions: any[];
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
  customClassName?: string;
}) => {
  const router = useRouter();
  return (
    <Autocomplete
      className={customClassName}
      options={searchSuggestions}
      getOptionLabel={(option) => option.yourLabel} // Specify the property to use as the label
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search"
          onChange={({ target }) => setSearch(target.value)}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              router.push(`/products?search=${search}`);
              ev.preventDefault();
            }
          }}
        />
      )}
      renderOption={(props, option) => (
        <Link href={`/product/${option?.url}`} key={option?.url}>
          <li {...props} key={option.id}>
            <div className="flex flex-row w-full">
              <img
                className="w-12 h-12 mr-5 lg:w-16 lg:h-16 object-contain"
                src={option.image}
              />
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col">
                  <span className="text-[10px]">OFFER FROM SELLERS</span>
                  <span className="font-bold">{option.yourLabel}</span>
                </div>
                <div className="flex flex-col items-end">
                  {/* price */}
                  <span className="text-sm lg:text-base font-bold">
                    {"$ " + (option?.price - option?.discount).toFixed(2)}
                  </span>
                  <span className="line-through text-sm lg:text-base">
                    {"$ " + option.price}
                  </span>
                  <span className=" border-red-500 border border-solid bg-red-50 w-fit text-sm lg:text-base rounded-sm">
                    {"- " +
                      Math.round((option?.discount / option?.price) * 100) +
                      " %"}
                  </span>
                </div>
              </div>
            </div>
          </li>

          <Divider variant="inset" component="li" />
        </Link>
      )}
      sx={{
        "& .MuiOutlinedInput-root": {
          border: "none",
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
    />
  );
};
