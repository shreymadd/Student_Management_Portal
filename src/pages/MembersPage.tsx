import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { Member } from '../types';
import MemberCard from '../components/MemberCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { AlertCircle, UserPlus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const MembersPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const [notification, setNotification] = useState<string | null>(
    location.state?.message || null
  );

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setMembers(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching members:', err);
        setError('Failed to load team members. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="large" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-100 text-red-700 p-4 rounded-md flex items-start space-x-3 max-w-2xl mx-auto">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium">Error</h3>
            <p>{error}</p>
          </div>
        </div>
      );
    }

    if (members.length === 0) {
      return (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700 mb-4">No team members found</h3>
          <p className="text-gray-500 mb-6">Get started by adding your first team member</p>
          <Link 
            to="/members/add" 
            className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Add New Member
          </Link>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map(member => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Team Members</h1>
        <Link 
          to="/members/add" 
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
        >
          <UserPlus className="h-5 w-5" />
          <span>Add Member</span>
        </Link>
      </div>

      {notification && (
        <div className="bg-green-100 text-green-700 p-4 rounded-md mb-6 flex items-center justify-between">
          <span>{notification}</span>
          <button 
            onClick={() => setNotification(null)}
            className="text-green-700 hover:text-green-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {renderContent()}
    </div>
  );
};

export default MembersPage;