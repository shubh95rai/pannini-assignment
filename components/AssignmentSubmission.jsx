"use client";

import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { z } from "zod";
import { Button } from "./ui/button";
import { useAssignmentContext } from "@/context/assignmentContext";

const SubmissionSchema = z.object({
  comment: z.string().optional(),
  file: z
    .custom((val) => val instanceof FileList && val.length > 0, {
      message: "File is required",
    })
    .refine((files) => files[0]?.type === "application/pdf", {
      message: "Only PDF files are allowed",
    }),
});

export default function AssignmentSubmission() {
  const { id } = useParams();
  const { assignments, addSubmission } = useAssignmentContext();

  const assignmentToSubmit = assignments.find((assignment) => {
    return assignment.id == id;
  });

  console.log(assignmentToSubmit);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SubmissionSchema),
  });

  function onSubmit(data) {
    try {
      const studentName = localStorage.getItem("studentName");
      const studentEmail = localStorage.getItem("studentEmail");

      const file = data.file[0];

      const newSubmission = {
        assignmentId: id,
        assignmentName: assignmentToSubmit.title,
        studentName,
        studentEmail,
        comment: data.comment || "",
        file: file.name,
        submittedAt: new Date().toLocaleDateString("en-gb", {
          dateStyle: "long",
        }),
      };

      addSubmission(newSubmission);
      alert("Submission successful!");
    } catch (error) {
      console.error("Error submitting assignment:", error);
      alert("Submission failed. Please try again.");
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">{assignmentToSubmit?.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Textarea
              placeholder="Enter your comment.."
              {...register("comment")}
            />
            {errors.comment && (
              <p className="mt-2 text-sm text-red-500">
                {errors.comment.message}
              </p>
            )}
          </div>

          <div>
            <Input type="file" accept=".pdf" {...register("file")} />

            {errors.file && (
              <p className="mt-2 text-sm text-red-500">{errors.file.message}</p>
            )}
          </div>
          <Button className="w-full">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}
