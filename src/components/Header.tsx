import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Home } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="bg-navy-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-teal-400" />
            <h1 className="text-xl font-bold">Student Team Management</h1>
          </Link>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link 
                  to="/" 
                  className={`flex items-center space-x-1 hover:text-teal-300 transition-colors ${
                    location.pathname === '/' ? 'text-teal-400' : ''
                  }`}
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/members" 
                  className={`hover:text-teal-300 transition-colors ${
                    location.pathname.includes('/members') && location.pathname !== '/members/add' 
                      ? 'text-teal-400' 
                      : ''
                  }`}
                >
                  View Members
                </Link>
              </li>
              <li>
                <Link 
                  to="/members/add" 
                  className={`hover:text-teal-300 transition-colors ${
                    location.pathname === '/members/add' ? 'text-teal-400' : ''
                  }`}
                >
                  Add Member
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;