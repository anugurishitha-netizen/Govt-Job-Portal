import { useParams, useNavigate } from "react-router-dom";
import { jobs } from "../data/jobsData";
import {
  ArrowLeft,
  Calendar,
  User,
  GraduationCap,
  IndianRupee,
  MapPin,
} from "lucide-react";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = jobs.find((j) => j.id === Number(id));

  if (!job) {
    return (
      <div className='flex justify-center items-center h-screen text-gray-500'>
        Job not found
      </div>
    );
  }

  return (
    <div className='bg-white min-h-screen py-10'>
      <div className='max-w-5xl mx-auto px-6'>
        {/* TOP BAR */}
        <div className='flex items-center justify-between mb-8'>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 text-sm font-medium text-[#0f172a] hover:text-[#2563eb] transition'
          >
            <ArrowLeft className='w-4 h-4' />
            Back
          </button>

          <span className='text-xs px-3 py-1 rounded-full bg-[#2563eb]/10 text-[#2563eb] font-medium'>
            {job.category}
          </span>
        </div>

        {/* TITLE */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-[#0f172a]'>{job.title}</h1>

          <div className='flex items-center gap-4 mt-3 text-sm text-gray-500'>
            <span className='flex items-center gap-1'>
              <MapPin className='w-4 h-4' />
              {job.location}
            </span>

            <span className='flex items-center gap-1'>
              <Calendar className='w-4 h-4' />
              Last: {job.importantDates.last}
            </span>
          </div>
        </div>

        {/* GRID CARDS */}
        <div className='grid md:grid-cols-2 gap-6'>
          {/* DATES */}
          <div className='p-6 border rounded-xl hover:shadow-lg transition'>
            <h3 className='flex items-center gap-2 font-semibold text-[#2563eb] mb-3'>
              <Calendar className='w-5 h-5' /> Important Dates
            </h3>
            <div className='text-sm text-gray-600 space-y-1'>
              <p>Start: {job.importantDates.start}</p>
              <p>Last: {job.importantDates.last}</p>
              <p>Exam: {job.importantDates.exam}</p>
            </div>
          </div>

          {/* ELIGIBILITY */}
          <div className='p-6 border rounded-xl hover:shadow-lg transition'>
            <h3 className='flex items-center gap-2 font-semibold text-[#2563eb] mb-3'>
              <GraduationCap className='w-5 h-5' /> Eligibility
            </h3>
            <p className='text-sm text-gray-600'>{job.eligibility}</p>
          </div>

          {/* AGE */}
          <div className='p-6 border rounded-xl hover:shadow-lg transition'>
            <h3 className='flex items-center gap-2 font-semibold text-[#2563eb] mb-3'>
              <User className='w-5 h-5' /> Age Limit
            </h3>
            <p className='text-sm text-gray-600'>
              {job.ageLimit.min} - {job.ageLimit.max} Years
            </p>
          </div>

          {/* SALARY */}
          <div className='p-6 border rounded-xl hover:shadow-lg transition'>
            <h3 className='flex items-center gap-2 font-semibold text-[#2563eb] mb-3'>
              <IndianRupee className='w-5 h-5' /> Salary
            </h3>
            <p className='text-sm text-gray-600'>{job.salary}</p>
          </div>
        </div>

        {/* CTA BUTTONS */}
        <div className='mt-10 grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-center'>
          {job.links?.apply && (
            <a
              href={job.links.apply}
              target='_blank'
              className='bg-[#2563eb] text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-700 transition'
            >
              Apply Online
            </a>
          )}

          {job.links?.notification && (
            <a
              href={job.links.notification}
              target='_blank'
              className='border border-[#2563eb] text-[#2563eb] px-4 py-3 rounded-xl font-semibold hover:bg-blue-50 transition'
            >
              Download Notification
            </a>
          )}

          {job.links?.official && (
            <a
              href={job.links.official}
              target='_blank'
              className='bg-gray-900 text-white px-4 py-3 rounded-xl font-semibold hover:bg-black transition'
            >
              Official Website
            </a>
          )}

          {job.links?.admitCard && (
            <a
              href={job.links.admitCard}
              target='_blank'
              className='bg-green-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-green-700 transition'
            >
              Admit Card
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
