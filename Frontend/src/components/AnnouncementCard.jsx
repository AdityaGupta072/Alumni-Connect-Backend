import React from "react";
import { Briefcase, GraduationCap, BookOpen, Users } from "lucide-react";

const typeIconMap = {
  project: <BookOpen className="text-blue-600 w-6 h-6" />,
  mentorship: <GraduationCap className="text-green-600 w-6 h-6" />,
  job: <Briefcase className="text-yellow-500 w-6 h-6" />,
  research: <Users className="text-purple-500 w-6 h-6" />,
  guidance: <Users className="text-indigo-500 w-6 h-6" />,
  workshop: <BookOpen className="text-pink-500 w-6 h-6" />,
};

const AnnouncementCard = ({ announcement }) => {
  const {
    type,
    role,
    title,
    description,
    tags,
    lastDate
  } = announcement;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm transition hover:scale-[1.02] duration-200">
      {/* Icon */}
      <div className="mb-3">{typeIconMap[type]}</div>

      {/* Title & Meta */}
      <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 capitalize">
        {type} by {role}
      </p>

      {/* Description */}
      <p className="text-sm text-gray-700 mt-3">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Deadline */}
      {lastDate && (
        <p className="text-sm text-gray-500 mt-4">
          Deadline: {new Date(lastDate).toISOString().split("T")[0]}
        </p>
      )}

      {/* Connect Button */}
      <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold">
        Connect
      </button>
    </div>
  );
};

export default AnnouncementCard;
