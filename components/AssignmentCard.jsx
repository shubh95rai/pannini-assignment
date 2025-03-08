import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

export default function AssignmentCard({ assignment, role }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{assignment.title}</CardTitle>
        <CardDescription>Due: {assignment.dueDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p>{assignment.description}</p>

          <Link href={`/assignments/${assignment.id}`}>
            <Button variant={"outline"}>Submit</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
