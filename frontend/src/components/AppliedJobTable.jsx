import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs = [] } = useSelector((store) => store.job); // ✅ safe default

  const getStatusColor = (status) => {
    switch (status) {
      case "rejected":
        return "bg-red-400";
      case "pending":
        return "bg-gray-400";
      case "accepted":
        return "bg-green-400";
      default:
        return "bg-blue-400";
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                You haven't applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map(({ _id, createdAt, job, status }) => (
              <TableRow key={_id}>
                <TableCell>{createdAt?.split("T")[0] || "N/A"}</TableCell>
                <TableCell>{job?.title || "N/A"}</TableCell>
                <TableCell>{job?.company?.name || "N/A"}</TableCell>
                <TableCell className="text-right">
                  <Badge className={getStatusColor(status)}>
                    {status?.toUpperCase() || "UNKNOWN"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
