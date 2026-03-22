"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Database,
  FileText,
  Users,
  Settings,
  Bell,
  UploadCloud,
  CheckCircle,
  AlertCircle,
  Star,
  TrendingUp,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  Library,
  History,
  Wallet,
  School,
  UserCog,
  PlusCircle,
  Trash2,
  Edit3,
  Search,
  ChevronRight,
  Loader2,
} from "lucide-react";

export default function GatesAdminPortal() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [file, setFile] = useState<File | null>(null);

  const menuGroups = [
    {
      title: "Core Admin",
      items: [
        { id: "Dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "Lecture Halls", label: "Lecture Halls", icon: School },
        { id: "Subjects", label: "Subjects", icon: BookOpen },
        { id: "Circulars", label: "Circulars", icon: ClipboardList },
      ],
    },
    {
      title: "Academic Control",
      items: [
        { id: "Knowledge", label: "AI Knowledge Base", icon: Database },
        { id: "Attendance", label: "Attendance", icon: CalendarCheck },
        { id: "Library", label: "Library Books", icon: Library },
      ],
    },
    {
      title: "Accounts & HR",
      items: [
        { id: "Leave", label: "Leave History", icon: History },
        { id: "Payslip", label: "Payslip", icon: Wallet },
        { id: "Users", label: "User Management", icon: UserCog },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#060608] text-zinc-100 font-sans">
      <aside className="w-64 border-r border-zinc-800 bg-[#09090b] hidden md:flex flex-col">
        <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg">G</div>
          <span className="font-bold text-lg tracking-tight uppercase">Gates Admin</span>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {menuGroups.map((group, idx) => (
            <div key={idx}>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-3 px-2">{group.title}</p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                      activeTab === item.id
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                    }`}
                  >
                    <item.icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-bold text-zinc-400 hover:text-white transition-all uppercase tracking-widest"
          >
            Exit to Chat
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-[#09090b]/80 backdrop-blur-md">
          <h2 className="font-bold text-xs tracking-widest uppercase text-blue-500">{activeTab}</h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold">Abrar</p>
                <p className="text-[10px] text-zinc-500">System Administrator</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 border border-white/10 flex items-center justify-center font-bold text-xs">AK</div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 animate-in fade-in duration-500">
          {activeTab === "Dashboard" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Top Row: System Status & Critical Tasks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-500/10 text-green-500 rounded-lg border border-green-500/20">
                      <CheckCircle size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      System Status
                    </span>
                  </div>
                  <h2 className="text-xl font-bold">All Nodes Online</h2>
                  <p className="text-xs text-zinc-500 mt-1">Backend connected to Gates DB</p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg border border-blue-500/20">
                      <ClipboardList size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      Pending Approvals
                    </span>
                  </div>
                  <h2 className="text-xl font-bold">04 Circulars</h2>
                  <p className="text-xs text-zinc-500 mt-1">Waiting for Admin verification</p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg border border-purple-500/20">
                      <Database size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      Last Knowledge Sync
                    </span>
                  </div>
                  <h2 className="text-xl font-bold">2 hours ago</h2>
                  <p className="text-xs text-zinc-500 mt-1">Manual sync required for CSE Dept</p>
                </div>
              </div>

              {/* Main Content: Recent System Activity */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/30">
                  <h3 className="font-bold text-lg">Recent Administrative Activity</h3>
                  <button className="text-[10px] font-bold text-blue-500 uppercase hover:underline">
                    View All Logs
                  </button>
                </div>
                <div className="p-2">
                  {[
                    { action: "New Lecture Hall Assigned", target: "Room 202 (Civil)", time: "10 mins ago", icon: <School size={14}/> },
                    { action: "Circular Posted", target: "Mid-Term Exam Schedule", time: "1 hour ago", icon: <ClipboardList size={14}/> },
                    { action: "Knowledge Base Updated", target: "Admissions CSV", time: "2 hours ago", icon: <Database size={14}/> },
                    { action: "User Access Granted", target: "Dr. Ramesh (HOD)", time: "5 hours ago", icon: <UserCog size={14}/> }
                  ].map((log, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-zinc-800/30 rounded-xl transition-all border-b border-zinc-800/50 last:border-0">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-zinc-950 border border-zinc-800 text-zinc-400 rounded-lg">{log.icon}</div>
                        <div>
                          <p className="text-sm font-semibold">{log.action}</p>
                          <p className="text-xs text-zinc-500">{log.target}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-600">{log.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Launchpad */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button onClick={() => setActiveTab("Lecture Halls")} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-blue-500/50 transition-all text-left group">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase mb-2">Shortcut</p>
                  <p className="text-sm font-bold group-hover:text-blue-500">Manage Rooms →</p>
                </button>
                <button onClick={() => setActiveTab("Knowledge")} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-blue-500/50 transition-all text-left group">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase mb-2">Shortcut</p>
                  <p className="text-sm font-bold group-hover:text-blue-500">Sync AI Data →</p>
                </button>
                <button onClick={() => setActiveTab("Circulars")} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-blue-500/50 transition-all text-left group">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase mb-2">Shortcut</p>
                  <p className="text-sm font-bold group-hover:text-blue-500">Post Circular →</p>
                </button>
                <button onClick={() => setActiveTab("Attendance")} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-blue-500/50 transition-all text-left group">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase mb-2">Shortcut</p>
                  <p className="text-sm font-bold group-hover:text-blue-500">Daily Presence →</p>
                </button>
              </div>
            </div>
          )}

          {activeTab === "Lecture Halls" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Lecture Hall Management</h3>
                  <p className="text-xs text-zinc-500">Assign curriculum and branches to physical classrooms.</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-600/20">
                  <PlusCircle size={14} /> Add Assignment
                </button>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-3 text-zinc-500" size={16} />
                  <input
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:ring-1 focus:ring-blue-600 outline-none transition-all"
                    placeholder="Search by Room Number, Branch or Course..."
                  />
                </div>
                <select className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 text-xs font-bold text-zinc-400 outline-none cursor-pointer hover:border-zinc-700">
                  <option>All Academic Years</option>
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-950 text-zinc-500 uppercase text-[10px] font-bold tracking-widest border-b border-zinc-800">
                    <tr>
                      <th className="px-6 py-4">Room No</th>
                      <th className="px-6 py-4">Course Type</th>
                      <th className="px-6 py-4">Department / Branch</th>
                      <th className="px-6 py-4">Year</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {[
                      { room: "001", course: "MBA", branch: "Dept. of Management Studies", year: "2nd Year" },
                      { room: "226", course: "B.Tech", branch: "Computer Science (CSE-B)", year: "2nd Year" },
                      { room: "007", course: "MCA", branch: "Master of Applications", year: "2nd Year" },
                      { room: "202", course: "B.Tech", branch: "Civil Engineering (A)", year: "4th Year" },
                      { room: "105", course: "B.Tech", branch: "Electronics (ECE)", year: "3rd Year" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-zinc-800/20 transition-all group">
                        <td className="px-6 py-4">
                          <span className="bg-zinc-950 border border-zinc-800 px-3 py-1 rounded-lg font-mono text-blue-400 font-bold group-hover:border-blue-600/40 transition-colors">
                            {row.room}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-zinc-200">{row.course}</td>
                        <td className="px-6 py-4 text-zinc-400 text-xs">{row.branch}</td>
                        <td className="px-6 py-4">
                          <span className="text-zinc-500 text-[10px] uppercase font-bold bg-zinc-800/50 px-2 py-0.5 rounded border border-zinc-800">
                            {row.year}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 hover:bg-blue-600/10 hover:text-blue-500 rounded-lg transition-colors">
                              <Edit3 size={14} />
                            </button>
                            <button className="p-2 hover:bg-red-600/10 hover:text-red-500 rounded-lg transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-4 bg-zinc-950/50 border-t border-zinc-800 flex justify-between items-center text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                  <span>Displaying 5 Active Assignments</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 border border-zinc-800 rounded hover:bg-zinc-800 transition-colors cursor-not-allowed">Prev</button>
                    <button className="px-3 py-1 border border-zinc-800 rounded hover:bg-zinc-800 transition-colors">Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Knowledge" && (
            <div className="max-w-2xl mx-auto py-12 text-center space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl shadow-2xl">
                <UploadCloud size={60} className="mx-auto text-blue-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4 tracking-tight">AI Training Hub</h3>
                <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
                  Sync new campus datasets (CSV/JSON) to enhance the Chatbot's accuracy and reduce unanswered queries.
                </p>
                <div className="border-2 border-dashed border-zinc-800 rounded-2xl p-12 hover:border-blue-500/50 transition-all cursor-pointer relative group bg-zinc-950/50">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                  <p className="text-zinc-400 font-medium">{file ? file.name : "Select Knowledge File (.csv, .json)"}</p>
                </div>
                <button className="w-full mt-8 bg-blue-600 hover:bg-blue-500 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 uppercase tracking-widest text-xs">
                  Sync Dataset
                </button>
              </div>
            </div>
          )}

          {activeTab === "Subjects" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">Course Curriculum</h3>
                  <p className="text-xs text-zinc-500 font-medium">Manage and sync subjects for RAG training.</p>
                </div>
                <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-xl text-xs font-bold border border-zinc-700 transition-all">
                  Bulk Edit Subjects
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { dept: "Computer Science", code: "CSE", count: 42, icon: <LayoutDashboard size={20} /> },
                  { dept: "Mechanical Eng.", code: "ME", count: 38, icon: <Settings size={20} /> },
                  { dept: "Management Studies", code: "MBA", count: 24, icon: <Users size={20} /> },
                  { dept: "Civil Engineering", code: "CE", count: 35, icon: <School size={20} /> },
                ].map((item, i) => (
                  <div key={i} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-blue-500/30 transition-all group cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-blue-500 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-bold text-zinc-500 bg-zinc-950 px-2 py-1 rounded border border-zinc-800 uppercase tracking-widest">{item.code}</span>
                    </div>
                    <h4 className="font-bold text-lg mb-1">{item.dept}</h4>
                    <p className="text-xs text-zinc-500">{item.count} Subjects Tracked</p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase">
                      Manage Data <ChevronRight size={12} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Attendance" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl flex flex-col items-center justify-center text-center">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Today's Presence</p>
                  <h2 className="text-5xl font-black text-green-500 mb-2 tracking-tighter">92%</h2>
                  <p className="text-xs text-zinc-400">1,380 / 1,500 Students Present</p>
                  <div className="w-full bg-zinc-950 h-2 rounded-full mt-6 border border-zinc-800 overflow-hidden">
                    <div className="bg-green-500 h-full w-[92%] shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <AlertCircle size={18} className="text-red-500" /> Low Attendance Alerts
                  </h3>
                  <div className="space-y-3">
                    {["CSE - 2nd Year (74%)", "Civil - 4th Year (68%)", "MBA - 1st Year (71%)"].map((alert, i) => (
                      <div key={i} className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl flex justify-between items-center">
                        <span className="text-xs font-bold text-zinc-300">{alert}</span>
                        <button className="text-[10px] font-bold text-red-500 uppercase hover:underline underline-offset-4">Notify HOD</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-zinc-800 bg-zinc-950/30 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Recent Attendance Logs</span>
                  <span className="text-[10px] font-mono text-zinc-500">Live Sync: 1:30 PM</span>
                </div>
                <div className="p-12 text-center">
                  <Loader2 className="animate-spin mx-auto mb-4 text-blue-500" size={32} />
                  <p className="text-sm font-bold text-zinc-400">Fetching live biometric data...</p>
                  <p className="text-xs text-zinc-500 mt-1 italic">Handled by backend Member 1</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Circulars" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Official Circulars</h3>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all">
                  + Post New Notice
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: "Mid-Term Examination Schedule", date: "22 March 2026", dept: "Examination Cell", priority: "High" },
                  { title: "Annual Sports Meet Registration", date: "20 March 2026", dept: "Physical Education", priority: "Normal" },
                  { title: "Workshop on AI & Robotics", date: "18 March 2026", dept: "CSE Department", priority: "Important" },
                ].map((note, i) => (
                  <div key={i} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-all flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                            note.priority === "High" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"
                          }`}
                        >
                          {note.priority}
                        </span>
                        <p className="text-xs text-zinc-500 font-medium">{note.date}</p>
                      </div>
                      <h4 className="font-bold text-lg text-zinc-200">{note.title}</h4>
                      <p className="text-xs text-zinc-500 tracking-wide uppercase font-bold">{note.dept}</p>
                    </div>
                    <button className="p-2 text-zinc-500 hover:text-white transition-colors">
                      <FileText size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Library" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Library Inventory</h3>
                <div className="flex gap-2">
                  <button className="bg-zinc-800 text-xs px-4 py-2 rounded-xl border border-zinc-700 font-bold">Export Report</button>
                  <button className="bg-blue-600 text-white text-xs px-4 py-2 rounded-xl font-bold shadow-lg shadow-blue-600/20">+ Add Book</button>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-950 text-zinc-500 uppercase text-[10px] font-bold border-b border-zinc-800">
                    <tr>
                      <th className="px-6 py-4">Book Title</th>
                      <th className="px-6 py-4">Author</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {[
                      { title: "Introduction to Algorithms", author: "Cormen et al.", cat: "CSE", status: "Available" },
                      { title: "Machine Learning", author: "Tom Mitchell", cat: "AI/ML", status: "Issued" },
                      { title: "Structural Analysis", author: "R.C. Hibbeler", cat: "Civil", status: "Available" },
                    ].map((book, i) => (
                      <tr key={i} className="hover:bg-zinc-800/20 transition-all">
                        <td className="px-6 py-4 font-semibold text-zinc-200">{book.title}</td>
                        <td className="px-6 py-4 text-zinc-400 text-xs">{book.author}</td>
                        <td className="px-6 py-4">
                          <span className="bg-zinc-950 px-2 py-1 rounded text-[10px] border border-zinc-800">{book.cat}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-bold ${book.status === "Available" ? "text-green-500" : "text-yellow-500"}`}>
                            {book.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "Payslip" && (
            <div className="max-w-3xl mx-auto space-y-6 animate-in zoom-in-95 duration-300">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 h-40 w-40 bg-blue-600/5 rounded-full blur-3xl"></div>

                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Salary Statement</h3>
                    <p className="text-sm text-zinc-500 font-mono uppercase tracking-tighter">Month: March 2026</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-blue-500">GATES INSTITUTE</p>
                    <p className="text-[10px] text-zinc-500">Employee ID: G-8821</p>
                  </div>
                </div>

                <div className="space-y-4 border-t border-zinc-800 pt-6">
                  <div className="flex justify-between text-sm py-2">
                    <span className="text-zinc-500">Basic Pay</span>
                    <span className="font-bold">₹ 54,000.00</span>
                  </div>
                  <div className="flex justify-between text-sm py-2">
                    <span className="text-zinc-500">HRA / Allowances</span>
                    <span className="font-bold">₹ 12,500.00</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-zinc-800/50 pb-4">
                    <span className="text-zinc-500">Deductions (PF/Tax)</span>
                    <span className="font-bold text-red-500">- ₹ 4,200.00</span>
                  </div>
                  <div className="flex justify-between items-center py-6">
                    <span className="text-lg font-bold text-zinc-400">Net Payable Amount</span>
                    <span className="text-3xl font-black text-white tracking-tighter">₹ 62,300.00</span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all mt-4 flex items-center justify-center gap-2">
                  <FileText size={16} /> Download PDF Receipt
                </button>
              </div>

              <p className="text-center text-[10px] text-zinc-600 uppercase font-bold tracking-widest">Digitally Verified by Gates Accounts Wing</p>
            </div>
          )}

          {activeTab === "Leave" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">Leave Management</h3>
                  <p className="text-xs text-zinc-500">Track and manage faculty and staff absence requests.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-600/20">
                  New Leave Request
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { name: "Mr. S. Anil Kumar", type: "Sick Leave", duration: "2 Days", date: "24-25 Mar", status: "Approved" },
                  { name: "Dr. Ramesh (HOD CSE)", type: "Casual Leave", duration: "1 Day", date: "28 Mar", status: "Pending" },
                  { name: "Mrs. Priya (Librarian)", type: "Personal", duration: "3 Days", date: "01-03 Apr", status: "Rejected" },
                ].map((leave, i) => (
                  <div key={i} className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex justify-between items-center group hover:border-zinc-700 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center font-bold text-xs text-blue-500">
                        {leave.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{leave.name}</h4>
                        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tight">
                          {leave.type} • {leave.duration}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono text-zinc-400 mb-1">{leave.date}</p>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${
                          leave.status === "Approved"
                            ? "bg-green-500/10 text-green-500"
                            : leave.status === "Pending"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Users" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">User Directory</h3>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-zinc-500" size={14} />
                    <input
                      className="bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-9 pr-4 text-xs outline-none focus:border-blue-500 w-64"
                      placeholder="Search by ID or Name..."
                    />
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all">+ Add User</button>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-950 text-zinc-500 uppercase text-[10px] font-bold border-b border-zinc-800">
                    <tr>
                      <th className="px-6 py-4 tracking-widest">User Details</th>
                      <th className="px-6 py-4 tracking-widest">Role</th>
                      <th className="px-6 py-4 tracking-widest">Department</th>
                      <th className="px-6 py-4 tracking-widest text-right">Access Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {[
                      { name: "S. Anil Kumar", id: "G-8821", role: "Administrator", dept: "Admin Office", access: "Super" },
                      { name: "Rahul Sharma", id: "S-1022", role: "Student", dept: "CSE", access: "Guest" },
                      { name: "Dr. Sneha", id: "F-3301", role: "Faculty", dept: "MBA", access: "Standard" },
                    ].map((user, i) => (
                      <tr key={i} className="hover:bg-zinc-800/20 transition-all group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-[10px] text-zinc-400">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <p className="font-bold text-zinc-200">{user.name}</p>
                              <p className="text-[10px] text-zinc-500 font-mono tracking-tighter">{user.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-zinc-400 text-xs">{user.role}</td>
                        <td className="px-6 py-4 text-zinc-500 text-xs">{user.dept}</td>
                        <td className="px-6 py-4 text-right">
                          <span
                            className={`text-[10px] font-bold px-2 py-1 rounded border ${
                              user.access === "Super"
                                ? "border-purple-500/30 text-purple-400 bg-purple-500/5"
                                : "border-zinc-700 text-zinc-500"
                            }`}
                          >
                            {user.access.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function ImpactCard({ icon, title, value, sub, color }: any) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-sm hover:border-zinc-700 transition-all group">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 bg-zinc-950 rounded-lg border border-zinc-800 ${color} group-hover:scale-110 transition-transform`}>{icon}</div>
        <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{title}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <h2 className="text-3xl font-bold text-white tracking-tight">{value}</h2>
        <span className="text-[10px] text-zinc-500 italic tracking-tighter">{sub}</span>
      </div>
    </div>
  );
}