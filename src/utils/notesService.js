import { supabase } from "./supabase";

export async function getNotes() {
  const { data, error } =
    await supabase
      .from("notes")
      .select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function saveNote(note) {
  const { data: existing } =
    await supabase
      .from("notes")
      .select("*")
      .eq("course_id", note.course_id)
      .maybeSingle();

  if (existing) {
    const { error } =
      await supabase
        .from("notes")
        .update({
          title: note.title,
          content: note.content,
        })
        .eq("course_id", note.course_id);

    if (error) {
      console.error(error);
    }

    return;
  }

  const { error } =
    await supabase
      .from("notes")
      .insert([
        {
          title: note.title,
          course_id: note.course_id,
          content: note.content,
        },
      ]);

  if (error) {
    console.error(error);
  }
}

export async function addNote(note) {
  const { error } =
    await supabase
      .from("notes")
      .insert([note]);

  if (error) {
    console.error(error);
  }
}

export async function deleteNote(id) {
  const { error } =
    await supabase
      .from("notes")
      .delete()
      .eq("id", id);

  if (error) {
    console.error(error);
  }
}