import { studentData } from "../data/mockData"; // In your local file

const StudentProfilePage = () => (
  <div className="py-20 bg-slate-100 animate-fade-in-up">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
          <img
            src={studentData.profilePic}
            alt="Student Profile"
            className="w-32 h-32 rounded-full border-4 border-amber-500 object-cover shadow-lg"
          />
          <div className="md:ml-8 mt-6 md:mt-0">
            <h2 className="text-4xl font-bold text-slate-800">
              {studentData.name}
            </h2>
            <p className="text-xl text-slate-600 mt-1">{studentData.class}</p>
            <p className="text-md text-slate-500 mt-1">
              ID: {studentData.studentId}
            </p>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-slate-50 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold text-slate-700 mb-4">
              Grades
            </h3>
            <ul className="space-y-3">
              {studentData.grades.map((g) => (
                <li
                  key={g.subject}
                  className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm"
                >
                  <span className="font-medium text-slate-600">
                    {g.subject}
                  </span>
                  <span className="font-bold text-lg text-slate-800">
                    {g.grade}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg flex flex-col items-center justify-center">
            <h3 className="text-2xl font-semibold text-slate-700 mb-4">
              Attendance
            </h3>
            <div className="text-6xl font-bold text-green-500">
              {studentData.attendance}
            </div>
          </div>
        </div>
        <div className="mt-8 bg-slate-50 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold text-slate-700 mb-4">
            Assignments
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="p-3 font-semibold text-slate-600">Subject</th>
                  <th className="p-3 font-semibold text-slate-600">Title</th>
                  <th className="p-3 font-semibold text-slate-600">Due Date</th>
                  <th className="p-3 font-semibold text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {studentData.assignments.map((a) => (
                  <tr key={a.id} className="border-b border-slate-200">
                    <td className="p-3">{a.subject}</td>
                    <td className="p-3">{a.title}</td>
                    <td className="p-3">{a.dueDate}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          a.submitted
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {a.submitted ? "Submitted" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default StudentProfilePage; // This would be uncommented in your local file
