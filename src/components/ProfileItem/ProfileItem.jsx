// src/components/Profile/ProfileItem.jsx
import React from 'react';

const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 p-2 border-b last:border-b-0">
    <div className="text-purple-600">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

export default ProfileItem;
