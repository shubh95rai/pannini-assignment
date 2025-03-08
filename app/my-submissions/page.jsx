"use client";

import SubmissionList from "@/components/SubmissionList";
import { useAssignmentContext } from "@/context/assignmentContext";
import { useEffect, useState } from "react";

export default function MySubmissionsPage() {
  const [studentEmail, setStudentEmail] = useState("");
  const { submissions } = useAssignmentContext();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setStudentEmail(localStorage.getItem("studentEmail") || "");
    }
  }, []);

  const mySubmissions = submissions.filter((sub) => {
    return sub.studentEmail === studentEmail;
  });

  return (
    <div className="flex min-h-screen items-start justify-center p-4 pt-20">
      <SubmissionList submissions={mySubmissions} />
    </div>
  );
}
