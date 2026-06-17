import { Link as ScrollLink} from "react-scroll";
import {Link } from "react-router-dom";
import {Disclosure, Transition} from "@headlessui/react";
import {Menu,X} from 'lucide-react';


const Navbar = () => {
  return (
      <Disclosure as="nav" className="fixed top-0 left-0 right-0 z-50 bg-gray-100 border-b border-gray-200 px-8 py-4 rounded-b-xl">
        {({open})=>(
            <>
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2">
          <img src="./logo.png" alt="CampusFlow" className="w-9 h-9" />
          <span className="font-bold text-xl text-[#0A1628]">
            Campus
            <span className="text-blue-600">Flow</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10 cursor-pointer">
          <ScrollLink
            to="features"
            smooth={true}
            duration={500}
            className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium"
          >
            Features
          </ScrollLink>
          <ScrollLink
            to="works"
            smooth={true}
            duration={500}
            className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium"
          >
            How it Works
          </ScrollLink>
          <Link
            to="/verify"
            className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium"
          >
            Verify
          </Link>
          <Link
                    to="/dashboard"
                    className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium"
                >
                  Dashboard
                </Link>
          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium"
          >
            Contact
          </ScrollLink>
        </div>

        <select className="hidden md:flex border border-gray-400 rounded-md px-2 py-2 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Select University</option>
          <option value="FUTO">FUTO</option>
          <option value="UNLIAG">UNILAG</option>
          <option value="UNN">UNN</option>
        </select>

        <Disclosure.Button className="md:hidden cursor-pointer">
          {open ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/> }
        </Disclosure.Button>

      </div>
      <Transition
          enter="transition ease-out duration-500"
          enterFrom="transform opacity-0 translate-y-8"
          enterTo="transform opacity-100 translate-y-0"
          leave="transition ease-in duration-400"
          leaveFrom="transform opacity-100 translate-y-0"
          leaveTo="transform opacity-0 translate-y-2"
      >
              <Disclosure.Panel className="md:hidden flex flex-col px-6 pb-4 gap-3 pt-4 w-40">
                <ScrollLink
                    to="features"
                    smooth={true}
                    duration={500}
                    className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium cursor-pointer"
                >
                  Features
                </ScrollLink>
                <ScrollLink
                    to="works"
                    smooth={true}
                    duration={500}
                    className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium cursor-pointer"
                >
                  How it Works
                </ScrollLink>
                <Link
                    to="/verify"
                    className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium"
                >
                  Verify
                </Link>
                <ScrollLink
                    to="contact"
                    smooth={true}
                    duration={500}
                    className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium cursor-pointer"
                >
                  Contact
                </ScrollLink>
                <Link
                    to="/dashboard"
                    className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium"
                >
                  Dashboard
                </Link>
              </Disclosure.Panel>
          </Transition>
            </>
        )}
      </Disclosure>
  );
};

export default Navbar;
