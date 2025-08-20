

import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// const skills = ["Html", "Css", "Javascript", "Reactjs"];
 const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open,setOpen]=useState(false);
  const {user}=useSelector(store=>store.auth);
 
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex justify-center items-start bg-gray-50 p-4">
        <div className="w-full max-w-7xl bg-white border border-gray-200 rounded-2xl p-8">
          
          {/* Profile Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src="https://tse4.mm.bing.net/th/id/OIP.esfv5ueHIM4_fMaafUiAtgHaGL?pid=Api&P=0&h=180"
                  alt="User Avatar"
                />
              </Avatar>
              <div>
                <h1 className="font-medium text-xl">{user?.fullname}</h1>
                <p className="text-sm text-gray-600">
                {user?.profile.bio}
                </p>
              </div>
            </div>
            <Button onClick={()=>setOpen(true)} variant="outline">
              <Pen className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>

          {/* Contact Info */}
          <div className="my-5">
            <div className="flex items-center gap-3 my-2">
              <Mail />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 my-2">
              <Contact />
              <span>{user?.phoneNumber}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="my-5">
            <h2 className="font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap items-center gap-2">
              { user?.Profile?.skills.length !== 0 ? (
               user?.profile?. skills.map((item, index) => (<Badge key={index}>{item}</Badge>))
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="grid w-full max-w-sm items-start gap-1.5">
            <Label className="text-md font-bold">Resume</Label>
            {isResume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={user?.profile?.resume}
                className="text-blue-500 hover:underline"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>

          {/* Applied Jobs */}
          <div className="mt-10">
            <h2 className="font-bold text-lg mb-4">Applied Jobs</h2>
            <AppliedJobTable />
          </div>
          <UpdateProfileDialog open={open} setOpen={setOpen}/>

        </div>
      </div>
    </div>
  );
};

export default Profile;
