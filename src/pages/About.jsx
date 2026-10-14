export default function About() {
  return (
    <div className='bg-white text-[#0f172a]'>
      <div className='max-w-6xl mx-auto px-6 py-16'>
        {/* TOP INTRO */}
        <div className='text-center max-w-2xl mx-auto'>
          <h1 className='text-4xl font-bold'>
            About <span className='text-[#2563eb]'>CyberCafe</span>
          </h1>
          <p className='mt-4 text-gray-500'>
            A modern platform built to simplify job discovery and help users
            stay updated with real opportunities.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className='mt-16 grid md:grid-cols-2 gap-12 items-center'>
          {/* LEFT */}
          <div>
            <h2 className='text-2xl font-semibold mb-4'>
              Why we built this platform?
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              Searching for jobs online is often confusing and cluttered.
              CyberCafe solves this by providing a clean, fast, and focused
              experience where users can easily find the latest job updates
              without distractions.
            </p>

            <div className='mt-6 space-y-3 text-sm text-gray-600'>
              <p>✔ Real-time job updates</p>
              <p>✔ Clean and simple interface</p>
              <p>✔ Mobile-first responsive design</p>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className='bg-[#2563eb]/5 p-8 rounded-2xl border'>
            <h3 className='text-lg font-semibold text-[#2563eb]'>
              🚀 Our Vision
            </h3>
            <p className='mt-3 text-gray-600 text-sm'>
              To become India's most trusted and fastest job update platform
              where users can rely on accurate and verified information.
            </p>
          </div>
        </div>

        {/* FEATURES */}
        <div className='mt-20 grid md:grid-cols-3 gap-6'>
          <div className='p-6 border rounded-xl hover:shadow-lg transition'>
            <h3 className='font-semibold text-[#2563eb]'>⚡ Fast Updates</h3>
            <p className='text-sm text-gray-500 mt-2'>
              Instant job notifications without delay.
            </p>
          </div>

          <div className='p-6 border rounded-xl hover:shadow-lg transition'>
            <h3 className='font-semibold text-[#2563eb]'>🎯 Focused UI</h3>
            <p className='text-sm text-gray-500 mt-2'>
              Minimal design to improve user experience.
            </p>
          </div>

          <div className='p-6 border rounded-xl hover:shadow-lg transition'>
            <h3 className='font-semibold text-[#2563eb]'>🔒 Trusted Data</h3>
            <p className='text-sm text-gray-500 mt-2'>
              Verified job listings you can rely on.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
