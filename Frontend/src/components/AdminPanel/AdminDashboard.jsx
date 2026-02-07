import { useState } from "react";
 import Sidebar from "./Sidebar";
// import UploadQuestions from "../components/UploadQuestions";
// import SystemAccess from "../components/SystemAccess";
import UploadQuestionsForm from "./UploadQuestionsForm";
import SystemAccess from "./SystemAccess";

export default function AdminDashboard({ setIsAuth }) {
  const [page, setPage] = useState("upload");

  return (
    <div className="flex">
      <Sidebar
        setPage={setPage}
        logout={() => setIsAuth(false)}
      />

      <div className="flex-1 p-6 bg-[#ffffff] ">
         
      {page === "upload" && <UploadQuestionsForm />} 
        {page === "system" && <SystemAccess />}
      </div>
    </div>
  );
}

//  {page === "upload" && <UploadQuestions />}
//         {page === "system" && <SystemAccess />} 