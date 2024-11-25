"use client";
import Grid from "@/components/grid";
import { Search } from "@/components/ui/search";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Fundraiser } from "@/types";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Query = () => {
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const { query } = useParams();
  const fetchFundraisers = async () => {
    try {
      const response = await axios.get(`/api/search/${query}`);
      setFundraisers(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFundraisers();
  }, [query]);
  return (
    <div>
      <div className="px-6 sm:px-8 md:px-16 lg:px-24 xl:px-32 pt-32">
        <h1 className="text-2xl md:text-3xl text-center font-bold">
          Search fundraisers on Caring 4 All
        </h1>
        <p className="text-center text-neutral-500 my-5 text-sm">
          Find fundraisers by title, keyword or a person’s name
        </p>
        <Search
          placeholders={[
            "Find by title",
            "Look up by keyword",
            "Search by individual’s name",
          ]}
          onChange={(e) => setSearch(e.target.value)}
          onSubmit={() => {
            router.push(`/search/${search}`);
          }}
        />
      </div>
      <Grid
        title={"Showing Results for: " + decodeURIComponent(query.toString())}
        fundraisers={fundraisers}
      />
    </div>
  );
};

export default Query;
