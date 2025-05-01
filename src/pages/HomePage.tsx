import React from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-160px)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Student Team Members Management</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-200">
            A comprehensive platform to manage your student team members efficiently and effectively.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link 
              to="/members/add" 
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-colors"
            >
              <UserPlus className="h-5 w-5" />
              <span>Add Member</span>
            </Link>
            <Link 
              to="/members" 
              className="bg-white hover:bg-gray-100 text-navy-800 px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-colors"
            >
              <Users className="h-5 w-5" />
              <span>View Members</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Team Introduction */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Meet Our Team</h2>
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
            <p className="text-lg text-gray-700 mb-6">
              Our team consists of talented individuals with diverse skills and backgrounds. Each member brings unique 
              perspectives and expertise to our projects, allowing us to tackle complex challenges effectively.
            </p>
            
            <p className="text-lg text-gray-700 mb-6">
              We believe in open communication, collaboration, and continuous learning. By working together, we create 
              innovative solutions that exceed expectations.
            </p>
            
            <p className="text-lg text-gray-700">
              Use this application to manage team members, track roles and responsibilities, and keep contact information 
              up-to-date for seamless collaboration.
            </p>
            
            <div className="mt-8 flex justify-center">
              <Link 
                to="/members" 
                className="bg-navy-600 hover:bg-navy-700 text-white px-6 py-3 rounded-md flex items-center gap-2 transition-colors"
              >
                <Users className="h-5 w-5" />
                <span>Explore Team Members</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;