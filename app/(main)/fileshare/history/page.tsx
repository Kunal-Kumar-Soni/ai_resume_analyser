"use client";
import { supabaseClient } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

const page = () => {
  const [totalData, setTotalData] = useState<any>();

  const getDataFromSupabase = async () => {
    const { error, data } = await supabaseClient.from("resumeai").select("*");
    if (data) {
      setTotalData(data);
      console.log(data);
    }
  };

  useEffect(() => {
    getDataFromSupabase();
  }, []);

  return <div>HistoryPage</div>;
};

export default page;
