"use client";

import { set } from "react-hook-form";

const { createContext, useState, useContext, useEffect } = require("react");

const AssignmentContext = createContext(null);

export default function AssignmentProvider({ children }) {
  const [role, setRole] = useState("student");
  const [submissions, setSubmissions] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // const storedRole = localStorage.getItem("userRole");
    // if (storedRole) {
    //   setRole(storedRole);
    // }

    const storedSubmissions = JSON.parse(localStorage.getItem("submissions"));

    if (storedSubmissions) {
      setSubmissions(storedSubmissions);
    }
  }, []);

  useEffect(() => {
    async function getAssignments() {
      try {
        const response = await fetch("/assignments.json");

        if (!response.ok) {
          throw new Error("Failed to load assignments!");
        }

        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        console.error("Failed to load assignments!:", error);
        alert(error.message);
      }
    }

    getAssignments();
  }, []);

  function addSubmission(newSubmission) {
    const updateSubmission = [...submissions, newSubmission];

    setSubmissions(updateSubmission);

    localStorage.setItem("submissions", JSON.stringify(updateSubmission));
  }

  const value = {
    role,
    setRole,
    filter,
    setFilter,
    assignments,
    addSubmission,
    submissions,
  };

  return (
    <AssignmentContext.Provider value={value}>
      {children}
    </AssignmentContext.Provider>
  );
}

export function useAssignmentContext() {
  return useContext(AssignmentContext);
}
