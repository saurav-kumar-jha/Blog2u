import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          
          {/* Blog Name & Description */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Blog2u</h2>
            <p className="text-sm text-gray-500 max-w-xs text-center md:text-left">
              Sharing insights, stories, and knowledge on web development, tech, and life.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-blue-500 transition">Home</a></li>
              <li><a href="/" className="hover:text-blue-500 transition">About</a></li>
              <li><a href="/" className="hover:text-blue-500 transition">Contact</a></li>
              <li><a href="/" className="hover:text-blue-500 transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-blue-500 transition text-xl"><FaFacebookF /></a>
              <a href="#" className="text-gray-500 hover:text-blue-400 transition text-xl"><FaTwitter /></a>
              <a href="#" className="text-gray-500 hover:text-pink-500 transition text-xl"><FaInstagram /></a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition text-xl"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Blog2u. All rights reserved.</p>
          <p>Developed by Saurav Kumar Jha</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
