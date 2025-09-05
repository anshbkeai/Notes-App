import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import notesService from "../backend/notes";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import authSerivce from "../backend/auth";
import { Container, LoadingSpinner } from "../components";

const ShareNote = () => {
    const { sharetoken } = useParams();
    const navigate = useNavigate();
    const [viewNote, setViewNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    const fetchViewNote = async () => {
        try {
            setIsLoading(true);
            const data = await authSerivce.getNoteByShareToken({ sharetoken });
            if (data && !data.error) {
                setViewNote(data);
                setError(null);
            } else {
                setError('Note not found or access denied');
            }
        } catch (err) {
            console.error('Error fetching shared note:', err);
            setError('Failed to load the shared note');
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown date';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    const getAuthorInitials = (email) => {
        if (!email) return 'U';
        const parts = email.split('@')[0].split('.');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return email[0].toUpperCase();
    };

    useEffect(() => {
        if (sharetoken) {
            fetchViewNote();
        } else {
            setError('Invalid share link');
            setIsLoading(false);
        }
    }, [sharetoken]);

    // Loading State
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
                <Container>
                    <div className="text-center">
                        <LoadingSpinner size="lg" text="Loading shared note..." />
                    </div>
                </Container>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
                <Container>
                    <div className="max-w-md mx-auto text-center">
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Note</h2>
                            <p className="text-gray-600 mb-6">{error}</p>
                            <button
                                onClick={() => navigate('/')}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Go to NoteHub
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // Main Content
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Header Bar */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
                <Container>
                    <div className="flex items-center justify-between py-4">
                        {/* Logo/Brand */}
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                    NoteHub
                                </span>
                                <div className="text-xs text-gray-500 -mt-1">Shared Note</div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={handleCopyLink}
                                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                title="Copy share link"
                            >
                                {copied ? (
                                    <>
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-green-600">Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        <span>Copy Link</span>
                                    </>
                                )}
                            </button>
                            
                            <button
                                onClick={() => navigate('/')}
                                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span>Visit NoteHub</span>
                            </button>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Main Content */}
            <Container>
                <div className="py-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Note Header */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex-1">
                                    <div className="flex items-center mb-4">
                                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                                        <span className="text-sm font-medium text-green-600">Shared Note</span>
                                    </div>
                                    
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                        {viewNote?.title || 'Untitled Note'}
                                    </h1>
                                </div>
                            </div>
                            
                            {/* Author & Meta Info */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                                            {getAuthorInitials(viewNote?.userCreatedEmail)}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                Shared by {viewNote?.userCreatedEmail || 'Unknown'}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {viewNote?.createdAt && formatDate(viewNote.createdAt)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-6 text-sm text-gray-500">
                                    {viewNote?.updatedAt && viewNote.updatedAt !== viewNote.createdAt && (
                                        <div className="flex items-center space-x-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            <span>Updated {formatDate(viewNote.updatedAt)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Note Content */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-8">
                            <div className="prose prose-lg max-w-none">
                                {viewNote?.content ? (
                                    <div className="text-gray-800 leading-relaxed">
                                        {typeof viewNote.content === "string" 
                                            ? parse(viewNote.content) 
                                            : JSON.stringify(viewNote.content)
                                        }
                                    </div>
                                ) : (
                                    <div className="text-center py-16 text-gray-500">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No content available</h3>
                                        <p>This note appears to be empty or the content couldn't be loaded.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer CTA */}
                        <div className="mt-12 text-center">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                                <h3 className="text-xl font-semibold mb-3">Like what you see?</h3>
                                <p className="text-blue-100 mb-6">Create your own notes and share them with NoteHub</p>
                                <button
                                    onClick={() => navigate('/')}
                                    className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Start Creating Notes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};
export default ShareNote;