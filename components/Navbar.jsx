"use client";

import { useAssignmentContext } from "@/context/assignmentContext";
import Link from "next/link";

export default function Navbar() {
  const { role } = useAssignmentContext();
  return (
    <nav className="fixed top-0 w-full shadow bg-background">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-center gap-8 px-4">
        <Link href="/" className="text-lg font-bold">
          Home
        </Link>
        <Link href="/assignments" className="text-lg font-bold">
          Assignments
        </Link>

        {role === "teacher" && (
          <Link href="/submissions" className="text-lg font-bold">
            Submissions
          </Link>
        )}

        {role === "student" && (
          <Link href="/my-submissions" className="text-lg font-bold">
            My Submissions
          </Link>
        )}
      </div>
    </nav>
  );
}
