import { useState } from "react";

export default function SystemAccess() {
  const [config, setConfig] = useState({
    systemActive: true,
    maintenanceMode: false,
    readOnly: false,

    uploadEnabled: true,
    interviewEnabled: true,
    codingEnabled: true,

    adminUploadLock: false,
  });

  const toggle = (key) => {
    setConfig({ ...config, [key]: !config[key] });
  };

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 p-6 rounded-xl shadow-lg shadow-blue-700">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 ">
        System Access & Controls
      </h1>

      {/* 🔹 MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 shadow-2xl shadow-blue-700 p-6 bg-white rounded-xl">

        {/* LEFT SIDE */}
        <div className="space-y-6">
          <Card title="Platform Status">
            <ToggleRow
              title="System Active"
              desc="Enable or disable the entire platform"
              enabled={config.systemActive}
              onToggle={() => toggle("systemActive")}
            />
            <ToggleRow
              title="Maintenance Mode"
              desc="Restrict access during maintenance"
              enabled={config.maintenanceMode}
              onToggle={() => toggle("maintenanceMode")}
            />
            <ToggleRow
              title="Read Only Mode"
              desc="Users can only view content"
              enabled={config.readOnly}
              onToggle={() => toggle("readOnly")}
            />
          </Card>

          <Card title="Feature Access Control">
            <ToggleRow
              title="Upload Questions"
              desc="Allow admins to upload questions"
              enabled={config.uploadEnabled}
              onToggle={() => toggle("uploadEnabled")}
            />
            <ToggleRow
              title="Interview Section"
              desc="Enable interview question access"
              enabled={config.interviewEnabled}
              onToggle={() => toggle("interviewEnabled")}
            />
            <ToggleRow
              title="Coding Round"
              desc="Enable coding problems"
              enabled={config.codingEnabled}
              onToggle={() => toggle("codingEnabled")}
            />
          </Card>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <Card title="Admin Security">
            <ToggleRow
              title="Admin Upload Lock"
              desc="Only super admin can upload"
              enabled={config.adminUploadLock}
              onToggle={() => toggle("adminUploadLock")}
            />

            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium text-red-600">
                  Force Logout All Admins
                </h4>
                <p className="text-sm text-gray-500">
                  Immediately end all admin sessions
                </p>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                Logout
              </button>
            </div>
          </Card>

          <Card title="System Info">
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                <span className="font-medium">Environment:</span> Test Mode
              </p>
              <p>
                <span className="font-medium">Last Updated:</span>{" "}
                {new Date().toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Admin Role:</span> Super Admin
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ===================== REUSABLE COMPONENTS ===================== */

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ToggleRow({ title, desc, enabled, onToggle }) {
  return (
    <div className="flex justify-between items-center border rounded-lg p-4">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>

      <button
        onClick={onToggle}
        className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
          enabled ? "bg-green-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`bg-white w-5 h-5 rounded-full shadow transform transition ${
            enabled ? "translate-x-7" : ""
          }`}
        />
      </button>
    </div>
  );
}