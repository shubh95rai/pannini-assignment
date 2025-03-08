"use client";

import SubmissionList from "@/components/SubmissionList";
import { useAssignmentContext } from "@/context/assignmentContext";

export default function SubmissionsPage() {
  const { submissions } = useAssignmentContext();
  return (
    <div className="flex min-h-screen items-start justify-center pt-20 p-4">
      <SubmissionList submissions={submissions} />
    </div>
  );
}
