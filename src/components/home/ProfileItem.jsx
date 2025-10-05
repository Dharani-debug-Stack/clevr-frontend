import React from 'react';

const ProfileItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-center p-4 rounded-lg bg-gray-50 border border-gray-200">
      <div className="flex-shrink-0 p-2 bg-white rounded-full mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{label}</h3>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default ProfileItem;