import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Member } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import { AlertCircle, Mail, Phone, User, ArrowLeft } from 'lucide-react';

const MemberDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      if (!id) return;
      
      try {
        const data = await api.getMemberById(id);
        setMember(data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching member with ID ${id}:`, err);
        setError('Failed to load member details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-md flex items-start space-x-3 max-w-2xl mx-auto">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium">Error</h3>
            <p>{error}</p>
            <Link to="/members" className="text-red-700 underline mt-2 inline-block">
              Return to members list
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Member Not Found</h2>
          <p className="text-gray-600 mb-6">The team member you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/members" 
            className="inline-flex items-center px-4 py-2 bg-navy-600 text-white rounded-md hover:bg-navy-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Members
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/members" 
        className="inline-flex items-center text-navy-600 hover:text-navy-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        <span>Back to all members</span>
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-200">
            {member.profile_image_url ? (
              <img 
                src={member.profile_image_url} 
                alt={`${member.full_name}'s profile`} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-gray-200">
                <User className="w-24 h-24 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="p-6 md:w-2/3">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{member.full_name}</h1>
            <p className="text-xl text-teal-600 font-medium mb-6">{member.role}</p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <a 
                  href={`mailto:${member.email}`} 
                  className="text-navy-600 hover:underline"
                >
                  {member.email}
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <a 
                  href={`tel:${member.contact_number}`} 
                  className="text-navy-600 hover:underline"
                >
                  {member.contact_number}
                </a>
              </div>
            </div>
            
            {member.created_at && (
              <p className="text-sm text-gray-500 mt-8">
                Member since {new Date(member.created_at).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsPage;