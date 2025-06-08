import React, { ChangeEvent, useState } from "react";
import { Cancel } from "@mui/icons-material";
// import fileStructureImage from "../../assets/images/programming-graded-exercise-file-structure.png";
import { useTheme } from "../../context/ThemeContext";
import { uploadExamApi } from "../../api/teacher.api";
import { toast } from "react-toastify";
import { GradedExercise } from "../../static/Interface";
import { useNavigate } from "react-router-dom";
import FormSelect from "../Admin/components/FormSelect";

type RoomProps = {
  rooms: any[];
  courses: any[];
};

const TeacherUploadProgramingExam: React.FC<RoomProps> = ({
  rooms,
  courses,
}) => {
  console.log(courses);
  const [file, setFile] = useState<File | null>(null);
  const [room, setRoom] = useState("");
  const [course, setCourse] = useState("");
  const [previewData, setPreviewData] = useState<GradedExercise | null>(null);
  const { themeMode } = useTheme();
  const route = useNavigate();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file || null);

    // preview the file if file is present
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          setPreviewData(json); // etract json file data
        } catch (error) {
          toast.error("Invalid Json format");
          setPreviewData(null);
        }
      };
      reader.readAsText(file);
      // console.log(previewData);
    }
  };

  const handleSubmit = async () => {
    // if (!previewData) return null; // Means no file uploaded or upload failed
    try {
      // send request to server to save uploaded exam
      const request = await uploadExamApi({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          examData: previewData,
          course: course,
          room: room,
        }),
      });
      const response = await request.json();

      const { status, message } = response;

      if (status === "error") {
        toast.error(message);
        console.log(message);
      } else if (status === "OK") {
        route("/teacher/manage-exams");
        toast.success(message);
        // setFile(null);
        setPreviewData(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Return component UI
  return (
    <div className="w-full mt-2 p-6">
      <form action="">
        <h1 className="text-xl font-bold mb-4">Upload Graded Exercise File</h1>

        <section className="w-full p-3 flex gap-2">
          <FormSelect
            name="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            options={rooms}
            style="small-input"
            placeholder="Choose a class"
          />
          <FormSelect
            name="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            options={courses}
            style="small-input"
            placeholder="Select a course for this exam"
          />
        </section>

        {/**File input for upload */}
        <section className="w-full p-3 mt-3">
          <button
            type="button"
            color="inherit"
            className="w-30 h-8 border-none rounded-md bg-dark text-white hover:bg-light hover:text-black"
            style={{ cursor: "pointer" }}
          >
            <label htmlFor="file" className="cursor-pointer">
              Upload File
            </label>
          </button>
          <span className="text-slate-400 ml-10">
            File Uploaded: {file?.name}
          </span>
          <input
            id="file"
            type="file"
            accept=".json"
            className="mb-4 hidden cursor-pointer"
            onChange={handleFileChange}
          />
        </section>

        <h4 className="text-danger pt-4">
          File Uploaded must match below structure
        </h4>
        {/* {!previewData && (
  <div className="w-[40vw] h-[40vh] mt-2">
    <img
      src={fileStructureImage}
      className="w-full h-full"
      alt="file-structure_img"
    />
  </div>
)} */}

        {/**Display uploaded data */}
        {previewData && (
          <div
            className={` ${
              themeMode === "dark" &&
              "bg-content-dark text-[#ffffffae] border-b-1 border-r-1 border-[#ffffff1f]"
            } p-4 rounded shadow`}
          >
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-2">Preview</h2>
              <span className="cursor-pointer">
                <Cancel />
              </span>
            </div>
            <p>
              <strong>Title:</strong> {previewData.examTitle}
            </p>
            <p>
              <strong>Type:</strong> {previewData.type}
            </p>
            <p>
              <strong>Duration:</strong> {previewData.durationMinutes}
            </p>

            <h3 className="mt-4 font-bold">Exercises</h3>
            <ul className="list-disc pl-6">
              {previewData.exercises.map((ex, i) => (
                <li key={i}>{ex.question}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
        >
          Submit Exercise
        </button>
      </form>
    </div>
  );
};

export default TeacherUploadProgramingExam;
