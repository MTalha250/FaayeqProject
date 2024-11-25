"use client";
import Card from "@/components/card";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Fundraiser } from "@/types";
import axios from "axios";

const Discover = () => {
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  const fetchFundraisers = async () => {
    try {
      const response = await axios.get("/api/fundraiser");
      setFundraisers(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFundraisers();
  }, []);

  return (
    <div className="mt-[70vh] sm:mt-[80vh] rounded-t-[2rem] bg-white -translate-y-10 px-6 sm:px-8 md:px-16 lg:px-24 xl:px-32 pt-20 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="font-semibold text-xl sm:text-2xl text-center md:text-left">
          Discover fundraisers inspired by what you care about
        </h1>
        <Link
          href="/all-fundraisers"
          className="text-neutral-500 flex items-center mt-4 md:mt-0 whitespace-nowrap"
        >
          Explore more
          <FaArrowRightLong className="inline-block ml-2 animate-bounce-horizontal" />
        </Link>
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {fundraisers.slice(0, 4).map((fundraiser, index) => (
          <Card
            key={fundraiser._id}
            image={fundraiser.image}
            title={fundraiser.title}
            donations={fundraiser.donations.length}
            totalAmount={fundraiser.totalAmount}
            amountRaised={fundraiser.amountRaised}
            status={fundraiser.status}
            first={index === 0}
            href={`/categories/${fundraiser.category}/${fundraiser._id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
