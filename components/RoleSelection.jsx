"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAssignmentContext } from "@/context/assignmentContext";

const FormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(10, { message: "Name must be at most 10 characters long" })
    .trim(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
});

export default function RoleSelection() {
  const router = useRouter();
  // const [role, setRole] = useState("");

  const { role, setRole } = useAssignmentContext();
  // console.log(role);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: "", email: "" },
  });

  function onSubmit(data) {
    if (!role) {
      return alert("Please select a role!");
    }

    localStorage.setItem("userRole", role);

    if (role === "student") {
      localStorage.setItem("studentName", data.name);
      localStorage.setItem("studentEmail", data.email);
    }

    router.push("/assignments");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome to Assignment System</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="flex w-full gap-2 *:w-full">
          <Button
            onClick={() => {
              setRole("student");
            }}
            variant={role === "student" ? "secondary" : "outline"}
          >
            Student
          </Button>
          <Button
            onClick={() => {
              setRole("teacher");
            }}
            variant={role === "teacher" ? "secondary" : "outline"}
          >
            Teacher
          </Button>
        </div>

        {role === "student" && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-4"
          >
            <div>
              <Input
                type="text"
                placeholder="Enter your name"
                {...register("name")}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <Button>Continue</Button>
          </form>
        )}

        {role === "teacher" && (
          <Button onClick={onSubmit} className="w-full">
            Continue
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
