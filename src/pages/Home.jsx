import { Link } from "react-router-dom";
import { categories } from "../data/jobs";

export default function Home() {
  return (
    <div className='bg-white py-12'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-8'>
          {categories.map((cat) => {
            const Icon = cat.icon;

            return (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className='group relative p-8 rounded-2xl border 
                bg-white overflow-hidden transition-all duration-300
                hover:shadow-[0_15px_40px_rgba(37,99,235,0.15)]
                hover:-translate-y-1'
              >
                <div
                  className='absolute inset-0 bg-gradient-to-br 
                from-[#2563eb]/5 to-transparent opacity-0 
                group-hover:opacity-100 transition'
                />

                <div
                  className='w-12 h-12 rounded-xl bg-[#2563eb]/10 
                flex items-center justify-center mb-5
                group-hover:scale-110 transition'
                >
                  <Icon className='text-[#2563eb] w-6 h-6' />
                </div>

                <h2 className='font-semibold text-lg text-[#0f172a] text-center'>
                  {cat.name}
                </h2>

                <div
                  className='h-[2px] w-0 bg-[#2563eb] mx-auto mt-2 
                group-hover:w-10 transition-all duration-300'
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
