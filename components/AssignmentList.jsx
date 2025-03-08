"use client";

import { useAssignmentContext } from "@/context/assignmentContext";
import { Input } from "./ui/input";
import AssignmentCard from "./AssignmentCard";

export default function AssignmentList() {
  const { assignments, setFilter, filter, role } = useAssignmentContext();

  const filteredAssignments = assignments.filter((assigment) => {
    return assigment.title.toLowerCase().includes(filter.toLowerCase().trim());
  });
  return (
    <div className="w-full max-w-4xl space-y-4">
      <Input
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        className="rounded-lg"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAssignments.map((assignment) => {
          return (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              role={role}
            />
          );
        })}
      </div>
    </div>
  );
}
