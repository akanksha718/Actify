interface Props {
  status: string;
}

export default function ReportStatus({ status }: Props) {
  const color =
    status === "OPEN"
      ? "bg-blue-100 text-blue-700"
      : status === "IN_PROGRESS"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <span className={`${color} px-4 py-2 rounded-full text-sm font-semibold`}>
      {status.replace("_", " ")}
    </span>
  );
}