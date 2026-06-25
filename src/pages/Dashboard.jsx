import ProgressRow from "../components/ProgressRow";
import { useEffect, useState } from "react";
import {
  FaBook,
  FaTasks,
  FaChartLine,
  FaCalendarAlt,
  FaClock,
  FaStickyNote,
  FaBullseye,
  FaMusic
} from "react-icons/fa";
import widget1 from "../assets/widget.jpeg";
import widget2 from "../assets/widget2.jpg";
import ClockWidget from "../components/ClockWidget";
import { getCourses } from "../utils/courseService";
import { getAssignments } from "../utils/assignmentService";
import {
  getNotes,
  saveNote,
  deleteNote,
} from "../utils/notesService";

function Dashboard() {

  const [courses, setCourses] = useState([]);

  const [assignments, setAssignments] = useState([]);

  const [quickNotes, setQuickNotes] = useState([]);

  const [noteTitle, setNoteTitle] = useState("");

  const [noteContent, setNoteContent] = useState("");

  const completedAssignments =
    assignments.filter(
      (assignment) =>
        assignment.status === "Completed"
    ).length;

  const gradePoints = {
    A: 4,
    B: 3,
    C: 2,
    D: 1,
    F: 0,
  };

  let totalPoints = 0;
  let totalCredits = 0;

  courses.forEach((course) => {
    totalPoints +=
      gradePoints[course.grade] *
      course.credits;

    totalCredits += course.credits;
  });

  const gpa =
    totalCredits === 0
      ? 0
      : (
          totalPoints / totalCredits
        ).toFixed(2);




const loadQuickNotes = async () => {
  const allNotes =
    await getNotes();

  setQuickNotes(
    allNotes.filter(
      (note) =>
        note.course_id === null
    )
  );
};

const addQuickNote = async () => {
  if (!noteContent.trim()) return;

  await saveNote({
    title: noteTitle,
    content: noteContent,
    course_id: null,
  });

  setNoteTitle("");
  setNoteContent("");

  alert("Note Saved!");
};

const [weeklyGoals, setWeeklyGoals] = useState(
  JSON.parse(
    localStorage.getItem("weeklyGoals")
  ) || []
);
const [newGoal, setNewGoal] = useState("");

useEffect(() => {
  localStorage.setItem(
    "weeklyGoals",
    JSON.stringify(weeklyGoals)
  );
}, [weeklyGoals]);

const addGoal = () => {
  if (!newGoal.trim()) return;

  setWeeklyGoals([
    ...weeklyGoals,
    {
      id: Date.now(),
      text: newGoal,
      completed: false,
    },
  ]);

  setNewGoal("");
};

const [yearGoals, setYearGoals] = useState(
  JSON.parse(
    localStorage.getItem("yearGoals")
  ) || []
);

const [newYearGoal, setNewYearGoal] =
  useState("");

useEffect(() => {
  localStorage.setItem(
    "yearGoals",
    JSON.stringify(yearGoals)
  );
}, [yearGoals]);

const addYearGoal = () => {
  if (!newYearGoal.trim()) return;

  setYearGoals([
    ...yearGoals,
    {
      id: Date.now(),
      text: newYearGoal,
      completed: false,
    },
  ]);

  setNewYearGoal("");
};

const [tasks, setTasks] = useState(
  JSON.parse(
    localStorage.getItem("weeklyTasks")
  ) || []
);

const [newTask, setNewTask] =
  useState("");

useEffect(() => {
  localStorage.setItem(
    "weeklyTasks",
    JSON.stringify(tasks)
  );
}, [tasks]);

const addTask = () => {
  if (!newTask.trim()) return;

  setTasks([
    ...tasks,
    {
      id: Date.now(),
      text: newTask,
      completed: false,
    },
  ]);

  setNewTask("");
};

const completedTasks =
  tasks.filter(
    (task) => task.completed
  ).length;

  const assignmentPercentage =
  assignments.length === 0
    ? 0
    : Math.round(
        (completedAssignments /
          assignments.length) *
          100
      );

      const completedYearGoals =
  yearGoals.filter(
    (goal) => goal.completed
  ).length;

const yearPercentage =
  yearGoals.length === 0
    ? 0
    : Math.round(
        (completedYearGoals /
          yearGoals.length) *
          100
      );

    const weeklyPercentage =
      tasks.length === 0
        ? 0
        : Math.round(
            (completedTasks /
              tasks.length) *
              100
          );
    useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const courseData =
      await getCourses();

    const assignmentData =
      await getAssignments();
    
      await loadQuickNotes();

    setCourses(courseData || []);
    setAssignments(
      assignmentData || []
    );
  };
  return (
    <div>
    
      <div className="top-grid "> {/* Classes card */}
        <div className="card">
          <h3>
            <FaBook className="card-icon" />
            Classes</h3>
        <p className="gpa-stat">{gpa}</p>
          <p>Current GPA</p>

          <hr />

          {courses.length === 0 ? (
            <p>No courses added yet.</p>
          ) : (
            courses.map((course) => (
              <div
                key={course.id}
                className="course-item"
              >
                <strong>{course.course_name}</strong>

                <span><p>
                  Grade: {course.grade}
                </p></span>
              </div>
            ))
          )}
        </div>

        <div className="card clock-card">
            <h3>
              <FaClock className="card-icon" />
              Clock
            </h3>
            <ClockWidget className="clock-card"/>
          </div>
{/*----------- Image Widget ---------------->*/}
       <div className="card image-card">
        <img src={widget1} width="250px" alt="Widget" />
      </div>

      </div>
{/*----------- Progress Card ---------------->*/}
      <div className="progress-card card">

{/*----------- Progress Widget ---------------->*/}
          <div>
            <h3> <FaChartLine className="card-icon" /> Progress</h3>
          </div>
        <div className="progress">
          <div className="card">

            <ProgressRow
              title="Assignments"
              percentage={assignmentPercentage}
            />

            <ProgressRow
              title="Weekly Tasks"
              percentage={weeklyPercentage}
            />

            <ProgressRow
              title="End of Year Goals"
              percentage={yearPercentage}
            />
          </div>

{/*----------- End of Year Goals Widget ---------------->*/}
        <div className="card">
          <h3>
            <FaClock className="card-icon" />
            End of Year Goals
          </h3>
         <input
            type="text"
            value={newYearGoal}
            placeholder="Add goal..."
            onChange={(e) =>
              setNewYearGoal(
                e.target.value
              )
            }
          />

          <button onClick={addYearGoal}>
            Add
          </button>

          {yearGoals.map((goal) => (
            <div
              key={goal.id}
              className="goal-item"
            >
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() =>
                  setYearGoals(
                    yearGoals.map((g) =>
                      g.id === goal.id
                        ? {
                            ...g,
                            completed:
                              !g.completed,
                          }
                        : g
                    )
                  )
                }
              />

              <span
                  className={
                    goal.completed
                      ? "goal-completed"
                      : "goal-active"}>
                  {goal.text}
              </span>
            </div>
          ))}
        </div>

{/*----------- Weekly Task Widget ---------------->*/}
      <div className="card">
        <h3>
          <FaBullseye className="card-icon" /> 
          Weekly Tasks
        </h3>

        <input
    type="text"
    value={newTask}
    placeholder="Add task..."
    onChange={(e) =>
      setNewTask(e.target.value)
    }
  />

  <button onClick={addTask}>
    Add
  </button>

  {tasks.map((task) => (
    <div
      key={task.id}
      className="goal-item"
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() =>
          setTasks(
            tasks.map((t) =>
              t.id === task.id
                ? {
                    ...t,
                    completed:
                      !t.completed,
                  }
                : t
            )
          )
        }
      />

      <span
        className={
          task.completed
            ? "goal-completed"
            : "goal-active"
        }
      >
        {task.text}
      </span>
    </div>
  ))}
      </div>

      <div className="card">
        <h3>
          <FaBullseye className="card-icon" /> 
          Weekly Goals
        </h3>
        <input
          type="text"
          placeholder="Add goal..."
          value={newGoal}
          onChange={(e) =>
            setNewGoal(e.target.value)
          }
        />

        <button onClick={addGoal}>
          Add
        </button>


  {weeklyGoals.map((goal) => (
      <div key={goal.id} className="goal-item">
          <input
            type="checkbox"
            checked={goal.completed}
            onChange={() =>
              setWeeklyGoals(
                weeklyGoals.map((g) =>
                  g.id === goal.id
                    ? {
                        ...g,
                        completed:
                          !g.completed,
                      }
                    : g
                )
              )
            }
          />

              <span
          className={
            goal.completed
              ? "goal-completed"
              : "goal-active"
          }
        >
          {goal.text}
          <span className="goal_delete">
            <button>
              -
            </button>
            
          </span>
        </span>
      </div>
  ))}
      </div>
        <div className="card">
          <h3>
            <FaTasks className="card-icon" />    Assignments</h3>

          <p>Total: {assignments.length}</p>

          <p>Completed: {completedAssignments}</p>

          <p>
            Remaining:
            {" "}
            {assignments.length - completedAssignments}
          </p>
        </div>
      </div>
      </div>
      <div className="bottom-grid">
       <div className="card image-card">
       <img src={widget2} width="250px" alt="Widget" />
      </div>

      <div className="card">
        <h3>
           <FaMusic className="card-icon" />
          Music</h3>
          

      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DX8NTLI2TtZa6"
        width="100%"
        height="352"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Study Music"
      ></iframe>
      </div>
      

  {/*----------- QUick Notes Widget ---------------->*/}
      <div className="card">
        <h3>
          <FaStickyNote className="card-icon" />
          Quick Notes
        </h3>

        <input
          type="text"
          placeholder="Title"
          value={noteTitle}
          onChange={(e) =>
            setNoteTitle(e.target.value)
          }
        />

        <textarea
          className="notes-input"
          value={noteContent}
          onChange={(e) =>
            setNoteContent(e.target.value)
          }
          placeholder="Write a note..."
        />

        <button onClick={addQuickNote}>
          Save Note
        </button>
      </div>
    </div>
   
        

        <div>
            <div className="card calendar-card">
              <h3>
                <FaCalendarAlt className="card-icon" />
                Calendar</h3>
                <div>
                <iframe
                  src="https://calendar.google.com/calendar/embed?src=74414a5c9aa2f45f1bbb795357d2cf4a07f4afc206d5fbc2c148bba54e4b120d%40group.calendar.google.com&ctz=America%2FChicago"
                  width="100%"
                  height="500"
                  title="Google Calendar"
                  className="iframe"
                />
              </div>
            </div>
      </div>
    </div>
  );
}

export default Dashboard;