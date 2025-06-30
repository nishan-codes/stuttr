"use server";

import { AnalysisResult } from "@/types";
import { createSupabaseClient } from "../supabase";
import { ParamValue } from "next/dist/server/request/params";
import { auth } from "@clerk/nextjs/server";

export const saveDashboard = async (
  id: ParamValue,
  userId: string,
  title: string,
  data: AnalysisResult,
) => {
  const supabase = await createSupabaseClient();

  const { error } = await supabase
  .from("dashboards")
  .insert({
    id,
    user_id: userId,
    title,
    data,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { message: "Dashboard saved successfully " };
};

export const getDashboard = async (id: ParamValue) => {
  const { userId } = await auth();

  const supabase = await createSupabaseClient();

  const { data, error } = await supabase
  .from('dashboards')
  .select('data')
  .eq('id', id)
  .eq('user_id', userId);

  if(error) {
    throw new Error('Dashboard not found or access denied')
  }
  
  return data[0].data;
}

export const getDashboards = async () => {
  const { userId } = await auth();

  const supabase = await createSupabaseClient();

  const { data, error } = await supabase
  .from('dashboards')
  .select()
  .eq('user_id', userId);

  if(error) {
    throw new Error('Dashboard not found or access denied')
  }

  console.log(data)
  return data;
}