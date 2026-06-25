import { supabase } from "./supabase";

export async function getCourses() {
  const { data, error } =
    await supabase
      .from("courses")
      .select("*")
      .order("id");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function addCourse(course) {
  const { error } =
    await supabase
      .from("courses")
      .insert([course]);

  if (error) {
    console.error(error);
  }
}

export async function deleteCourse(id) {
  const { error } =
    await supabase
      .from("courses")
      .delete()
      .eq("id", id);

  if (error) {
    console.error(error);
  }
}