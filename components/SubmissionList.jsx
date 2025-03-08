import SubmissionCard from "./SubmissionCard";

export default function SubmissionList({ submissions }) {
  return (
    <div className="w-full max-w-2xl">
      {submissions.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {submissions.map((submission, index) => {
            return <SubmissionCard key={index} submission={submission} />;
          })}
        </div>
      ) : (
        <p className="text-center font-semibold">No submissions yet.</p>
      )}
    </div>
  );
}
