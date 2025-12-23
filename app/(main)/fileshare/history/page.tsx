"use client";
import { supabaseClient } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

const page = () => {
  const limitedDataOnly = async () => {
    const { data: allData } = await supabaseClient.from("resumeai").select("*");

    if (allData && allData.length > 10) {
      const oldestId = allData[0].id;

      const { error: errorData, data: deletedData } = await supabaseClient
        .from("resumeai")
        .delete()
        .eq("id", oldestId);

      console.log(deletedData);
    }
  };

  useEffect(() => {
    limitedDataOnly();
  }, []);

  return <div>History Page</div>;
};

export default page;
