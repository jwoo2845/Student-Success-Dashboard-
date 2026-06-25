import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCourses } from "../utils/courseService";
import {
getAssignments,
addAssignment,
deleteAssignment,
} from "../utils/assignmentService";
import {
  getNotes,
  addNote,
} from "../utils/notesService";

function ClassPage() {
const { id } = useParams();

const [course, setCourse] = useState(null);

const [assignments, setAssignments] = useState([]);

const [classNotes, setClassNotes] = useState([]);

const [noteTitle, setNoteTitle] = useState("");

const [noteContent, setNoteContent] = useState("");

const [title, setTitle] = useState("");


useEffect(() => {
loadData();
}, [id]);

const loadData = async () => {

    const courses =
  await getCourses();

console.log("Route ID:", id);
console.log("Courses:", courses);

const selectedCourse =
  courses.find(
    (course) =>
      String(course.id) ===
      String(id)
  );

console.log(
  "Selected Course:",
  selectedCourse
);

setCourse(selectedCourse);

const allAssignments =
  await getAssignments();

const classAssignments =
  allAssignments.filter(
    (assignment) =>
      String(
        assignment.course_id
      ) === String(id)
  );

setAssignments(
  classAssignments
);

const allNotes =
  await getNotes();

const classNotes =
  allNotes.filter(
    (note) =>
      Number(note.course_id) ===
      Number(id)
  );

setClassNotes(classNotes);


};

const handleAddAssignment =
async () => {
if (!title.trim()) return;

  await addAssignment({
    course_id:
      Number(id),
    title,
    due_date: null,
    priority: "Medium",
    status: "Not Started",
  });

  setTitle("");

  loadData();
};

const handleDeleteAssignment =
async (assignmentId) => {
await deleteAssignment(
assignmentId
);

  loadData();
};


const handleAddNote = async () => {
  if (!noteTitle.trim() || !noteContent.trim()) {
    alert("Please enter a title and note.");
    return;
  }

  await addNote({
    title: noteTitle,
    course_id: Number(id),
    content: noteContent,
  });

  setNoteTitle("");
  setNoteContent("");

  await loadData();

  alert("Note Saved!");
};


if (course === null) {
  return <h1>Loading...</h1>;
}

console.log("Route ID:", id);

return ( 
<div className="class-page"> <div className="course-header"> <h1>
{
course.course_name
} </h1>

    <div className="course-stats">
      <span>
        Grade:
        {" "}
        {course.grade}
      </span>

      <span>
        Credits:
        {" "}
        {course.credits}
      </span>
    </div>
  </div>

  <div className="class-content">
    <div className="assignment-card">
      <h2>
        Current Assignments
      </h2>

      {assignments.length ===
      0 ? (
        <p>
          No assignments
          yet.
        </p>
      ) : (
        assignments.map(
          (
            assignment
          ) => (
            <div
              key={
                assignment.id
              }
              className="assignment-item"
            >
              <span>
                {
                  assignment.title
                }
              </span>

              <button
                onClick={() =>
                  handleDeleteAssignment(
                    assignment.id
                  )
                }
              >
                Delete
              </button>
            </div>
          )
        )
      )}

      <div className="assignment-card">
        <input
          type="text"
          placeholder="New Assignment"
          value={title}
          onChange={(
            e
          ) =>
            setTitle(
              e.target
                .value
            )
          }
        />

        <button
          onClick={
            handleAddAssignment
          }
        >
          Add Assignment
        </button>
      </div>
    </div>

    <div className="notes-card">
      <h2>Class Notes</h2>

        <input
        type="text"
        placeholder="Title..."
        value={noteTitle}
        onChange={(e) =>
            setNoteTitle(e.target.value)
        }
        />

        <textarea
        value={noteContent}
        onChange={(e) =>
            setNoteContent(e.target.value)
        }
        placeholder="Note..."
        />

        <button onClick={handleAddNote}>
        Add Note
        </button>
        </div>
  </div>
</div>


);
}

export default ClassPage;
