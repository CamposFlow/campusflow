import { Link } from "react-scroll";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-100 border-b border-gray-200 px-8 py-4 rounded-b-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="./logo.png" alt="CampusFlow" className="w-9 h-9" />
          <span className="font-bold text-xl text-[#0A1628]">
            Campus
            <span className="text-blue-600">Flow</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10 cursor-pointer">
          <Link
            to="features"
            smooth={true}
            duration={500}
            className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium"
          >
            Features
          </Link>
          <Link
            to="works"
            smooth={true}
            duration={500}
            className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium"
          >
            How it Works
          </Link>
          <Link
            to="#"
            smooth={true}
            duration={500}
            className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium"
          >
            Security
          </Link>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            className="nav-link text-gray-800 hover:text-blue-600 text-sm font-medium"
          >
            Contact
          </Link>
        </div>

        <select className="hidden md:flex border border-gray-400 rounded-md px-2 py-2 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Select University</option>
          <option value="FUTO">FUTO</option>
          <option value="UNLIAG">UNILAG</option>
          <option value="UNN">UNN</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
