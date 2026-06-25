import { supabase } from "./supabase";

export async function getAssignments() {
  const { data, error } =
    await supabase
      .from("assignments")
      .select("*")
      .order("id");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function addAssignment(
  assignment
) {
  const { error } =
    await supabase
      .from("assignments")
      .insert([assignment]);

  if (error) {
    console.error(error);
  }
}

export async function deleteAssignment(
  id
) {
  const { error } =
    await supabase
      .from("assignments")
      .delete()
      .eq("id", id);

  if (error) {
    console.error(error);
  }
}