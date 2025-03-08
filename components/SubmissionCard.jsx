import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function SubmissionCard({ submission }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{submission.assignmentName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p>Name: {submission.studentName}</p>
          <p>Email: {submission.studentEmail}</p>
          {submission.comment && <p>Comment: {submission.comment}</p>}
          <p>Submitted on: {submission.submittedAt}</p>
          <p></p>
        </div>
      </CardContent>
    </Card>
  );
}
