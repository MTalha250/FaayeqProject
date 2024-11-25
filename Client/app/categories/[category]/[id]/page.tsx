"use client";
import Main from "@/components/productDetails/main";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Fundraiser } from "@/types";
import axios from "axios";
import Grid from "@/components/grid";

const Category = () => {
  const { category, id } = useParams();
  const [fundraiser, setFundraiser] = useState<Fundraiser>();
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchFundraiser = async () => {
    try {
      const response = await axios.get(`/api/fundraiser/${id}`);
      setFundraiser(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFundraisers = async () => {
    try {
      const response = await axios.get(`/api/category/${category}`);
      setFundraisers(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFundraiser();
    fetchFundraisers();
    setLoading(false);
  }, [id]);

  return (
    <div>
      <Main fundraiser={fundraiser as Fundraiser} />
      <Grid
        title="Related Fundraisers"
        fundraisers={fundraisers.filter((f) => f._id !== id)}
      />
    </div>
  );
};

export default Category;
