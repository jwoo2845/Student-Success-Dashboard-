import { useState, useEffect } from "react";
import {
  getAssignments,
  addAssignment as saveAssignment,
  deleteAssignment as removeAssignment,
} from "../utils/assignmentService";
import { getCourses,} from "../utils/courseService";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);

  const [statusFilter, setStatusFilter] = useState("All"); // filter by status default
  const [courseIdFilter, setCourseIdFilter] = useState("All"); // filter by subject default 
  const [priorityFilter, setPriorityFilter] = useState("All"); // filter by priority defualt  
  const [title, setTitle] = useState("");  // default assignment title "none"
  const [courseId, setCourseId] = useState(""); // default subject "none"
  const [dueDate, setDueDate] = useState(""); // default due date "none"
  const [priority, setPriority] = useState("Medium"); // default priority "medium"
  const [status, setStatus] = useState("Not Started"); // default assignment status "not started"

 const loadCourses = async () => {
     const data =
       await getCourses();
 
     setCourses(data);
   };

  const addAssignment = async (e) => {
  e.preventDefault();

  await saveAssignment({
    course_id: Number(courseId),
    title,
    due_date: dueDate,
    priority,
    status,
  });

  await loadAssignments();

  setTitle("");
  setCourseId("");
  setDueDate("");
  setPriority("Medium");
  setStatus("Not Started");
};

  useEffect(() => {
  loadAssignments();
  loadCourses();
}, []);

const loadAssignments = async () => {
  const data =
    await getAssignments();

  setAssignments(data);
};

console.log(assignments);
console.log(courses);
  return (
    <div>
      <h1>Assignments:</h1>
          <br></br>
          <div className="assignment-stats">
            <div className="stat-box">
              <h2>{assignments.length}</h2>
              <p>Total</p>
            </div>

            <div className="stat-box">
              <h2>
                {
                  assignments.filter(
                    (a) =>
                      a.status === "Completed"
                  ).length
                }
              </h2>
              <p>Completed</p>
            </div>
         </div>
      <div className="assignment-form-card">
       <form onSubmit={addAssignment}>
        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={courseId}
          onChange={(e) =>
            setCourseId(e.target.value)
          }
        >
          <option value="">
            Select Class
          </option>

          {courses.map((course) => (
            <option
              key={course.id}
              value={course.id}
            >
              {course.course_name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button type="submit">Add Assignment</button>
      </form>
    </div>

      <hr />
      <div className="filter-card">
        <h2>Filter Assignments</h2>

        <select
        value={statusFilter} // status filter 
        onChange={(e) => setStatusFilter(e.target.value)}
        >
        <option value="All">Status</option>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        </select>

        <select
          value={courseIdFilter}
          onChange={(e) =>
            setCourseIdFilter(e.target.value)
          }
        >
          <option value="All">
            All Classes
          </option>

          {courses.map((course) => (
            <option
              key={course.id}
              value={course.id}
            >
              {course.course_name}
            </option>
          ))}
        </select>

        <select
            value={priorityFilter} // priority filter 
            onChange={(e) => setPriorityFilter(e.target.value)}
        >
        <option value="All">Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        </select>
      </div>

        {assignments
            .filter(
                (assignment) =>
                    (statusFilter === "All" ||
                        assignment.status === statusFilter) &&
                    (courseIdFilter == "All" || 
                        assignment.course_id == courseIdFilter) &&
                    (priorityFilter == "All" || 
                        assignment.priority == priorityFilter)
                    )
            .map((assignment) => (

        <div key={assignment.id}
        className="assignment-item-card">
            <h3>{assignment.title}</h3>

            <p>
              Class: {
                courses.find(
                  (course) =>
                    String(course.id) ===
                    String(assignment.course_id)
                )?.course_name || "No Class"
              }
            </p>

            <p>Due Date: {assignment.due_date}</p>

            <p>Priority: {assignment.priority}</p>

            <p>Status: {assignment.status}</p>

            <button 
                onClick={async () => {
                  await removeAssignment(
                    assignment.id
                  );

                  await loadAssignments();
                }}
                >Delete</button>
        </div>
        ))}
    </div>
  );
}

export default Assignments;