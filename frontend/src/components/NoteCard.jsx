import { Link } from "react-router";

const NotesCard = ({ note }) => {
  const createdDate = new Date(note.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Link to={`/notes/${note.slug}`} className="group block">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-200 hover:-translate-y-1 group-hover:bg-white">
        {/* Header with icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300">
              <svg className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
            <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {createdDate}
          </div>
        </div>
        
        {/* Title and content preview */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-200 leading-tight line-clamp-2">
            {note.title}
          </h2>
          
          {note.content && (
            <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
              {note.content.replace(/<[^>]*>/g, '').substring(0, 120)}...
            </p>
          )}
        </div>
        
        {/* Footer with read more indicator */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-400 space-x-4">
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {note.slug}
            </span>
          </div>
          
          <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
            <span className="text-xs font-medium mr-1">Read more</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NotesCard;
