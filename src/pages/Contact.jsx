export default function Contact() {
  return (
    <div className='bg-white text-[#0f172a]'>
      <div className='max-w-6xl mx-auto px-6 py-16'>
        {/* HEADER */}
        <div className='max-w-2xl'>
          <h1 className='text-4xl font-bold'>
            Get in <span className='text-[#2563eb]'>Touch</span>
          </h1>
          <p className='mt-3 text-gray-500'>
            Have a question or feedback? Fill the form and we’ll get back to
            you.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className='mt-12 grid md:grid-cols-2 gap-12'>
          {/* LEFT INFO */}
          <div className='space-y-6'>
            <div className='p-6 border rounded-xl'>
              <h3 className='font-semibold'>📧 Email</h3>
              <p className='text-sm text-gray-500 mt-1'>
                reehanmp7@gmail.com
              </p>
            </div>

            <div className='p-6 border rounded-xl'>
              <h3 className='font-semibold'>📞 Phone</h3>
              <p className='text-sm text-gray-500 mt-1'>+917899216384</p>
            </div>

            <div className='p-6 border rounded-xl'>
              <h3 className='font-semibold'>📍 Location</h3>
              <p className='text-sm text-gray-500 mt-1'>Khanagaon</p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <form className='bg-[#f8fafc] p-8 rounded-2xl border space-y-5' action="#">
            <input
              type='text'
              placeholder='Full Name'
              className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#2563eb] outline-none'
            />

            <input
              type='email'
              placeholder='Email Address'
              className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#2563eb] outline-none'
            />

            <textarea
              rows='4'
              placeholder='Your Message'
              className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#2563eb] outline-none'
            />

            <button className='w-full bg-[#2563eb] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition'>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
