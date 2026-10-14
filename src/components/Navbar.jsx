import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <header className='bg-white shadow-sm sticky top-0 z-50 border-b'>
        <div className='max-w-7xl mx-auto flex items-center justify-between px-6 py-4'>
          {/* LEFT - LOGO */}
          <NavLink to='/'>
            <h1 className='text-xl font-bold text-[#0f172a]'>
              Cyber<span className='text-[#2563eb]'>Cafe</span>
            </h1>
          </NavLink>
          {/* CENTER - MENU */}
          <nav className='hidden md:flex gap-8 font-medium text-[#0f172a]'>
            <NavLink to='/' className='hover:text-[#2563eb] transition'>
              Home
            </NavLink>
            <NavLink to='/about' className='hover:text-[#2563eb] transition'>
              About
            </NavLink>
            <NavLink to='/contact' className='hover:text-[#2563eb] transition'>
              Contact
            </NavLink>
          </nav>

          {/* RIGHT - ICONS */}
          <div className='hidden md:flex gap-4 text-lg text-[#0f172a]'>
            <FaInstagram className='cursor-pointer hover:text-[#2563eb]' />
            <FaFacebook className='cursor-pointer hover:text-[#2563eb]' />
            <FaWhatsapp className='cursor-pointer hover:text-[#2563eb]' />
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className='md:hidden'>
            <Menu
              onClick={() => setOpen(true)}
              className='cursor-pointer text-[#0f172a]'
            />
          </div>
        </div>
      </header>

      {/* 🔥 SIDEBAR OVERLAY */}
      <div
        className={`fixed inset-0 z-50 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* BACKDROP */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-all duration-300 ease-in-out ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* SIDEBAR */}
        <div
          className={`absolute top-0 left-0 h-full w-64 bg-white shadow-xl
    transform transition-all duration-300 ease-in-out
    ${open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
        >
          {/* HEADER */}
          <div className='flex justify-between items-center p-4 border-b'>
            <h2 className='font-bold text-[#0f172a]'>Menu</h2>
            <X
              onClick={() => setOpen(false)}
              className='cursor-pointer hover:rotate-90 transition duration-300'
            />
          </div>

          {/* MENU */}
          <div className='flex flex-col p-4 gap-4 text-[#0f172a]'>
            <NavLink
              to='/'
              onClick={() => setOpen(false)}
              className='hover:text-[#2563eb] transition'
            >
              Home
            </NavLink>
            <NavLink
              to='/about'
              onClick={() => setOpen(false)}
              className='hover:text-[#2563eb] transition'
            >
              About
            </NavLink>
            <NavLink
              to='/contact'
              onClick={() => setOpen(false)}
              className='hover:text-[#2563eb] transition'
            >
              Contact
            </NavLink>
          </div>

          {/* SOCIAL */}
          <div className='flex gap-4 p-4 border-t text-xl text-[#0f172a]'>
            <FaInstagram className='hover:text-[#2563eb] transition' />
            <FaFacebook className='hover:text-[#2563eb] transition' />
            <FaWhatsapp className='hover:text-[#2563eb] transition' />
          </div>
        </div>
      </div>
    </>
  );
}
