import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getCourses,
  addCourse as saveCourse,
  deleteCourse as removeCourse,
} from "../utils/courseService";

function GPA() {
  const [courses, setCourses] =
  useState([]);

  const [courseName, setCourseName] = useState("");
  const [grade, setGrade] = useState("A");
  const [credits, setCredits] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const data =
      await getCourses();

    setCourses(data);
  };

  const addCourse = async (e) => {
      e.preventDefault();

      await saveCourse({
        course_name: courseName,
        grade,
        credits: Number(credits),
        image,
      });

      await loadCourses();

      setCourseName("");
      setGrade("A");
      setCredits("");
      setImage("");
    };
        const calculateGPA = () => {
        const gradePoints = {
            A: 4.0,
            B: 3.0,
            C: 2.0,
            D: 1.0,
            F: 0.0,
        };

        let totalPoints = 0;
        let totalCredits = 0;

        courses.forEach((course) => {
            totalPoints +=
            gradePoints[course.grade] *
            course.credits;

            totalCredits += course.credits;
        });

        return totalCredits === 0
            ? 0
            : (totalPoints / totalCredits).toFixed(2);
        };
  return (
    <div>
      <h1>My Classes :</h1>

      <div className="gpa-header">
        <h1>{calculateGPA()}</h1>

        <p>Current GPA</p>

        <span>{courses.length} Classes</span>
      </div>

      <div className="add-course-card">
      <form onSubmit={addCourse}>
        <input
          type="text"
          placeholder="Course Name"
          required
          value={courseName}
          onChange={(e) =>
            setCourseName(e.target.value)
          }
        />

        <select
          value={grade}
          onChange={(e) =>
            setGrade(e.target.value)
          }
        >
          <option>A</option>
          <option>B</option>
          <option>C</option>
          <option>D</option>
          <option>F</option>
        </select>

        <input
          type="number"
          placeholder="Credit Hours"
          value={credits}
          onChange={(e) =>
            setCredits(e.target.value)
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];

            if (!file) return;

            const reader = new FileReader();

            reader.onloadend = () => {
              setImage(reader.result);
            };

            reader.readAsDataURL(file);
          }}
        />

        <button type="submit">
          Add Course
        </button>
      </form>
      </div>

<div className="classes-grid">
    {courses.map((course) => (
      <div
        key={course.id}
        className="class-card"
        onClick={() =>
          navigate(
            `/class/${course.id}`
          )
        }>

  <img
    src={course.image}
    alt={course.course_name}
    className="class-image"
  />

<div className="class-info">
  <span className="row">
    <div>
      <h3>{course.course_name}</h3>
      <p>Credits: {course.credits}</p>
    </div>

    <div className="grade-badge">
      {course.grade}
    </div>
  </span>

  <button
    className="delete-btn"
    onClick={async (e) => {
      e.stopPropagation();

      await removeCourse(course.id);

      await loadCourses();
    }}
  >
  <FaTrash />
</button>
</div>
</div>
  ))}
      </div>

     </div>
  );
}

export default GPA;