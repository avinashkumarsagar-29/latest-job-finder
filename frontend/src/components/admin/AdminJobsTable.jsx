import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs = [], searchJobByText } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const search = typeof searchJobByText === "string" ? searchJobByText.toLowerCase() : "";
    const filtered = allAdminJobs.filter((job) => {
      const title = job?.title?.toLowerCase() || "";
      const company = job?.company?.name?.toLowerCase() || "";
      return title.includes(search) || company.includes(search);
    });
    setFilteredJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recently posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No jobs found.
              </TableCell>
            </TableRow>
          ) : (
            filteredJobs.map(({ _id, title, company, createdAt }) => (
              <TableRow key={_id}>
                <TableCell>{company?.name || "N/A"}</TableCell>
                <TableCell>{title || "N/A"}</TableCell>
                <TableCell>{createdAt?.split("T")[0] || "N/A"}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/companies/${_id}`)}
                        className="flex items-center gap-2 cursor-pointer hover:text-primary"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/jobs/${_id}/applicants`)}
                        className="flex items-center gap-2 cursor-pointer mt-2 hover:text-primary"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;


