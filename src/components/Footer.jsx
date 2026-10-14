export default function Footer() {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <footer className='bg-white border-t mt-10'>
      <div className='max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4'>
        {/* LEFT */}
        <h2 className='font-bold text-[#0f172a]'>
          Reehan<span className='text-[#2563eb]'> M P</span>
        </h2>

        {/* CENTER */}
        <p className='text-sm text-gray-500'>© 2026 All rights reserved</p>
        

        {/* RIGHT (NEW) */}
        <div className='text-sm text-[#0f172a] font-medium'>
          Daily Update: <span className='text-[#2563eb]'>{formattedDate}</span>
        </div>
      </div>
    </footer>
  );
}
