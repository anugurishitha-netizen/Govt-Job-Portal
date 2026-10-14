import { useParams, Link, useNavigate } from "react-router-dom";
import { jobs } from "../data/jobsData";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";

export default function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const filteredJobs = jobs.filter((job) => job.category === slug);

  return (
    <div className='bg-white py-10'>
      <div className='max-w-6xl mx-auto px-6'>
        {/* TOP BAR */}
        <div className='flex items-center justify-between mb-8'>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 text-sm font-medium 
            text-[#0f172a] hover:text-[#2563eb] transition'
          >
            <ArrowLeft className='w-4 h-4' />
            Back
          </button>

          <h2 className='text-xl font-bold text-[#0f172a] capitalize'>
            {slug.replace("-", " ")}
          </h2>

          <div />
        </div>

        {/* 🔥 GRID START */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredJobs.map((job) => (
            <Link
              key={job.id}
              to={`/job/${job.id}`}
              className='group border rounded-xl p-5 
              flex flex-col justify-between
              hover:shadow-[0_10px_30px_rgba(37,99,235,0.15)]
              transition-all duration-300
              hover:-translate-y-1 bg-white'
            >
              {/* TOP */}
              <div>
                <h3 className='font-semibold text-[#0f172a] group-hover:text-[#2563eb] transition mb-2'>
                  {job.title}
                </h3>

                <div className='flex flex-col gap-1 text-sm text-gray-500'>
                  <span className='flex items-center gap-1'>
                    <MapPin className='w-4 h-4' />
                    {job.location}
                  </span>

                  <span className='flex items-center gap-1'>
                    <Calendar className='w-4 h-4' />
                    {job.importantDates?.last}
                  </span>
                </div>
              </div>

              {/* BOTTOM */}
              <div className='flex justify-between items-center mt-4'>
                <span
                  className='text-xs px-3 py-1 rounded-full 
                bg-[#2563eb]/10 text-[#2563eb] font-medium'
                >
                  {job.category}
                </span>

                <span className='text-sm font-semibold text-[#0f172a]'>
                  {job.salary}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
