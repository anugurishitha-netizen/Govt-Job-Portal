import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function CategoryCard({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className='bg-white rounded-2xl border p-5 
    transition-all duration-300 hover:shadow-xl hover:-translate-y-1'
    >
      {/* HEADER */}
      <div
        onClick={() => setOpen(!open)}
        className='flex justify-between items-start cursor-pointer'
      >
        <div>
          <h3 className='font-semibold text-[#0f172a] text-lg'>{data.title}</h3>
          <p className='text-xs text-gray-400 mt-1'>
            {data.category} • {data.location}
          </p>
        </div>

        <ChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180 text-[#2563eb]" : ""
          }`}
        />
      </div>

      {/* CONTENT */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className='text-sm text-gray-600 space-y-2'>
          {/* Important Dates */}
          <div>
            <p className='font-semibold text-[#2563eb]'>📅 Dates</p>
            <p>Start: {data.importantDates.start}</p>
            <p>Last: {data.importantDates.last}</p>
            <p>Exam: {data.importantDates.exam}</p>
          </div>

          {/* Eligibility */}
          <div>
            <p className='font-semibold text-[#2563eb]'>🎓 Eligibility</p>
            <p>{data.eligibility}</p>
          </div>

          {/* Age */}
          <div>
            <p className='font-semibold text-[#2563eb]'>👤 Age Limit</p>
            <p>
              {data.ageLimit.min} - {data.ageLimit.max} Years
            </p>
          </div>

          {/* Salary */}
          <div>
            <p className='font-semibold text-[#2563eb]'>💰 Salary</p>
            <p>{data.salary}</p>
          </div>

          {/* Button */}
          <Link
            to={`/job/${data.id}`}
            className='inline-block mt-3 bg-[#2563eb] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-blue-700 transition'
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
