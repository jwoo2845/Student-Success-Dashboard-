import { useState, useEffect } from "react";
import { getCourses } from "../utils/courseService";
import {
  getNotes,
  deleteNote,
} from "../utils/notesService";

function Notes() {
  const [courses, setCourses] = useState([]);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const courseData =
      await getCourses();

    const notesData =
      await getNotes();

    setCourses(courseData || []);
    setNotes(notesData || []);
  };
  const handleDeleteNote =
  async (id) => {
    await deleteNote(id);

    loadData();
  };
  return (
    <div className="notes-page">
      <h1>Notes</h1>

      {/* Quick Notes */}
      <h2>Quick Notes</h2>

        {notes
          .filter(
            (note) =>
              note.course_id === null
          )
          .map((note) => (
            <div
              key={note.id}
              className="note-card"
            >
              <h3>{note.title}</h3>

              <p>{note.content}</p>

              <button
                onClick={() =>
                  handleDeleteNote(
                    note.id
                  )
                }
              >
                Delete
              </button>
            </div>
        ))}

      {/* Class Notes */}
     <h2>Class Notes</h2>

{notes
  .filter((note) => note.course_id != null)
  .map((note) => {
    const course = courses.find(
      (c) =>
        Number(c.id) ===
        Number(note.course_id)
    );

    return (
      <div
        key={note.id}
        className="note-card"
      >
        <small className="note-course">
          {course?.course_name}
        </small>

        <h3>{note.title}</h3>

        <p>{note.content}</p>

        <button
          onClick={() =>
            handleDeleteNote(
              note.id
            )
          }
        >
          Delete
        </button>
      </div>
    );
  })}
    </div>
  );
}

export default Notes;