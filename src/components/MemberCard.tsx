import React from 'react';
import { Link } from 'react-router-dom';
import { Member } from '../types';
import { User } from 'lucide-react';

interface MemberCardProps {
  member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div className="h-48 bg-gray-200 relative">
        {member.profile_image_url ? (
          <img 
            src={member.profile_image_url} 
            alt={`${member.full_name}'s profile`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <User className="w-20 h-20 text-gray-400" />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{member.full_name}</h3>
        <p className="text-teal-600 font-medium mb-3">{member.role}</p>
        
        <Link 
          to={`/members/${member.id}`}
          className="block w-full py-2 px-4 bg-navy-600 text-white text-center rounded-md hover:bg-navy-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MemberCard;