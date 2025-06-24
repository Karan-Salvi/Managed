// import React, { useState } from "react";

// const SalaryCalculator = () => {
//   const [members, setMembers] = useState([
//     { name: "", salaryPerDay: 0, salaryWithCut: 0, days: 0 },
//   ]);

//   const handleChange = (index, field, value) => {
//     const updated = [...members];
//     updated[index][field] = field === "name" ? value : Number(value);
//     setMembers(updated);
//   };

//   const addMember = () => {
//     setMembers([
//       ...members,
//       { name: "", salaryPerDay: 0, salaryWithCut: 0, days: 0 },
//     ]);
//   };

//   const totalSalaryWithoutCut = members.reduce(
//     (sum, m) => sum + m.salaryPerDay * m.days,
//     0
//   );

//   const totalSalaryWithCut = members.reduce(
//     (sum, m) => sum + m.salaryWithCut * m.days,
//     0
//   );

//   return (
//     <div className="w-full mx-auto flex flex-col font-serif">
//       <h2 className="text-2xl font-bold mb-4">Salary Calculator</h2>
//       {members.map((m, index) => (
//         <div key={index} className="grid grid-cols-1 gap-4 mb-16">
//           <p className="text-lg font-bold">Member {index + 1}</p>
//           <div className="flex flex-col justify-center items-start gap-1">
//             <label
//               htmlFor="name"
//               className="text-gray-600 font-serif font-semibold"
//             >
//               Enter Name
//             </label>
//             <input
//               type="text"
//               placeholder="Member Name"
//               id="name"
//               value={m.name}
//               onChange={(e) => handleChange(index, "name", e.target.value)}
//               className="border p-2 w-full rounded-lg"
//             />
//           </div>
//           <div className="flex flex-col justify-center items-start gap-1">
//             <label
//               htmlFor="name"
//               className="text-gray-600 font-serif font-semibold"
//             >
//               Original Salary
//             </label>
//             <input
//               type="number"
//               placeholder="Salary/Day"
//               value={m.salaryPerDay}
//               onChange={(e) =>
//                 handleChange(index, "salaryPerDay", e.target.value)
//               }
//               className="border p-2 w-full rounded-lg"
//             />
//           </div>
//           <div className="flex flex-col justify-center items-start gap-1">
//             <label
//               htmlFor="name"
//               className="text-gray-600 font-serif font-semibold"
//             >
//               Salary with cut
//             </label>
//             <input
//               type="number"
//               placeholder="SalaryWithCut/Day"
//               value={m.salaryWithCut}
//               onChange={(e) =>
//                 handleChange(index, "salaryWithCut", e.target.value)
//               }
//               className="border p-2 w-full rounded-lg"
//             />
//           </div>

//           <div className="flex flex-col justify-center items-start gap-1">
//             <label
//               htmlFor="name"
//               className="text-gray-600 font-serif font-semibold"
//             >
//               No of Days
//             </label>
//             <input
//               type="number"
//               placeholder="Days"
//               value={m.days}
//               onChange={(e) => handleChange(index, "days", e.target.value)}
//               className="border p-2 w-full rounded-lg"
//             />
//           </div>
//         </div>
//       ))}
//       <button
//         onClick={addMember}
//         className="bg-blue-500 text-white px-4 py-2 rounded-lg my-4 mb-10"
//       >
//         + Add Member
//       </button>
//       <div className="text-lg font-semibold">
//         <p className="mb-4 font-serif font-bold">
//           Total Salary (without cut): ₹{totalSalaryWithoutCut}
//         </p>
//         <p className="mb-4 font-serif font-bold">
//           Total Salary (with cut): ₹{totalSalaryWithCut}
//         </p>
//       </div>

//       <table className="w-full mt-4">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="font-serif text-sm font-semibold border-2 border-gray-600">
//               Name
//             </th>
//             <th className="font-serif text-sm font-semibold border-2 border-gray-600">
//               Original Salary
//             </th>
//             <th className="font-serif text-sm font-semibold border-2 border-gray-600">
//               Salary with cut
//             </th>
//             <th className="font-serif text-sm font-semibold border-2 border-gray-600">
//               No of Days
//             </th>
//             <th className="font-serif text-sm font-semibold border-2 border-gray-600">
//               Total
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {members.map((m, index) => (
//             <tr key={index}>
//               <td className="font-serif text-sm font-medium border-2 border-gray-500">
//                 {m.name}
//               </td>
//               <td className="font-serif text-sm font-medium border-2 border-gray-500">
//                 ₹{m.salaryPerDay}
//               </td>
//               <td className="font-serif text-sm font-medium border-2 border-gray-500">
//                 ₹{m.salaryWithCut}
//               </td>
//               <td className="font-serif text-sm font-medium border-2 border-gray-500">
//                 {m.days}
//               </td>
//               <td className="font-serif text-sm font-medium border-2 border-gray-500">
//                 {m.salaryPerDay * m.days}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SalaryCalculator;

import React, { useState, useEffect } from "react";

const STORAGE_KEY = "salaryCalculatorMembers";

const SalaryCalculator = () => {
  const [members, setMembers] = useState([
    { name: "", salaryPerDay: 0, salaryWithCut: 0, days: 0 },
  ]);

  // Load from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setMembers(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever members change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  }, [members]);

  const handleChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = field === "name" ? value : Number(value);
    setMembers(updated);
  };

  const addMember = () => {
    setMembers([
      ...members,
      { name: "", salaryPerDay: 0, salaryWithCut: 0, days: 0 },
    ]);
  };

  const removeMember = (index) => {
    const updated = [...members];
    updated.splice(index, 1);
    setMembers(updated);
  };

  const clearAll = () => {
    setMembers([{ name: "", salaryPerDay: 0, salaryWithCut: 0, days: 0 }]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const totalSalaryWithoutCut = members.reduce(
    (sum, m) => sum + m.salaryPerDay * m.days,
    0
  );

  const totalSalaryWithCut = members.reduce(
    (sum, m) => sum + m.salaryWithCut * m.days,
    0
  );

  return (
    <div className="w-full mx-auto flex flex-col font-serif p-4 max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">Salary Calculator</h2>
      {members.map((m, index) => (
        <div key={index} className="grid grid-cols-1 gap-4 mb-16">
          <p className="text-lg font-bold">Member {index + 1}</p>
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 font-semibold">Enter Name</label>
            <input
              type="text"
              placeholder="Member Name"
              value={m.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              className="border p-2 w-full rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 font-semibold">
              Original Salary
            </label>
            <input
              type="number"
              placeholder="Salary/Day"
              value={m.salaryPerDay}
              onChange={(e) =>
                handleChange(index, "salaryPerDay", e.target.value)
              }
              className="border p-2 w-full rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 font-semibold">
              Salary with cut
            </label>
            <input
              type="number"
              placeholder="SalaryWithCut/Day"
              value={m.salaryWithCut}
              onChange={(e) =>
                handleChange(index, "salaryWithCut", e.target.value)
              }
              className="border p-2 w-full rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-600 font-semibold">No of Days</label>
            <input
              type="number"
              placeholder="Days"
              value={m.days}
              onChange={(e) => handleChange(index, "days", e.target.value)}
              className="border p-2 w-full rounded-lg"
            />
          </div>

          <button
            onClick={() => removeMember(index)}
            className="bg-red-500 text-white px-3 py-1 mt-2 rounded-lg w-fit"
          >
            Remove Member
          </button>
        </div>
      ))}

      <div className="flex gap-4  mb-10 w-full">
        <button
          onClick={addMember}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
        >
          + Add Member
        </button>
        <button
          onClick={clearAll}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg w-full"
        >
          Clear All
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
        <p className="text-xl font-bold">
          Total Salary (Original): ₹{totalSalaryWithoutCut}
        </p>
        <p className="text-xl font-bold text-red-500">
          Total Salary (With Cut): ₹{totalSalaryWithCut}
        </p>
      </div>

      <table className="w-full mt-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="border-2 border-gray-600 p-1 text-sm">Name</th>
            <th className="border-2 border-gray-600 p-1 text-sm">Salary</th>
            <th className="border-2 border-gray-600 p-1 text-sm">
              Salary with Cut
            </th>
            <th className="border-2 border-gray-600 p-1 text-sm">Days</th>
            <th className="border-2 border-gray-600 p-1 text-sm">Total </th>
          </tr>
        </thead>
        <tbody>
          {members.map((m, index) => (
            <tr key={index}>
              <td className="border-2 border-gray-500 p-1 text-sm">{m.name}</td>
              <td className="border-2 border-gray-500 p-1 text-sm">
                ₹{m.salaryPerDay}
              </td>
              <td className="border-2 border-gray-500 p-1 text-sm">
                ₹{m.salaryWithCut}
              </td>
              <td className="border-2 border-gray-500 p-1 text-sm">{m.days}</td>
              <td className="border-2 border-gray-500 p-1 text-sm">
                ₹{m.salaryPerDay * m.days}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalaryCalculator;
