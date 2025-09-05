import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import notesService from "../backend/notes";
import { Button, Container, LoadingSpinner } from "../components";
import parse from "html-react-parser"

const Note = () => {
    const [note, setNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
     const [showShare, setshowShare] = useState(false);
    const navigate = useNavigate();
    const { slug } = useParams();

    const [shareToken,setshareToken] = useState(null);
    const token = useSelector((state) => state.auth.token);

    const fetchNote = async () => {
        try {
            setIsLoading(true);
            const resp = await notesService.getBySlug({ slug, token });
            if (resp) {
                setNote(resp);
                setError(null);
            } else {
                setError('Note not found');
            }
        } catch (err) {
            console.error('Error fetching note:', err);
            setError('Failed to load note');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteNote = async () => {
        try {
            await notesService.deleteNoteBySlug({ slug, token });
            navigate("/dashboard");
        } catch (err) {
            console.error('Error deleting note:', err);
        }
    };

    const shareNote = async () => {
        const resp = await notesService.genrateShareNote({slug,token});
        setshareToken(resp.Sharetoken);
        console.log(shareToken);
        
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    useEffect(() => {
        if (slug) {
            fetchNote();
        } else {
            navigate("/dashboard");
        }
    }, [slug, navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" text="Loading note..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-600 text-lg font-medium mb-4">⚠️ {error}</div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return note ? (
        <div className="min-h-screen py-8">
            <Container>
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-start justify-between gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-4">
                                    <button
                                        onClick={() => navigate('/dashboard')}
                                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Back to Dashboard
                                    </button>
                                </div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                    {note.title}
                                </h1>
                                <div className="flex items-center gap-6 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Created: {formatDate(note.createdAt)}
                                    </div>
                                    {note.updatedAt && note.updatedAt !== note.createdAt && (
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Updated: {formatDate(note.updatedAt)}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex items-center gap-3">
                                <Link to={`/edit-note/${note.slug}`}>
                                    <Button variant="success" size="md">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </Button>
                                </Link>
                                <Button 
                                    variant="danger" 
                                    size="md"
                                    onClick={() => setShowDeleteConfirm(true)}
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete
                                </Button>

                                <Button 
                                    variant="outline" 
                                    size="md"
                                    onClick={() => setshowShare(true)}
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 12v-2a4 4 0 014-4h1m6 0h1a4 4 0 014 4v2m-5-6l5 5-5 5M12 19v-7"
                                        />
                                        </svg>

                                    Share
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-8">
                        <div className="prose prose-lg max-w-none">
                            {note?.content 
                                ? (typeof note.content === "string" 
                                    ? parse(note.content) 
                                    : JSON.stringify(note.content)) 
                                : (
                                    <div className="text-center py-12 text-gray-500">
                                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p>No content available for this note.</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </Container>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-md mx-4">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Delete Note</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete "{note.title}"? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <Button 
                                variant="secondary" 
                                onClick={() => setShowDeleteConfirm(false)}
                            >
                                Cancel
                            </Button>
                            <Button 
                                variant="danger" 
                                onClick={deleteNote}
                            >
                                Delete Note
                            </Button>
                        </div>
                    </div>
                </div>
            )}


{/* Share Confirmation Modal */}
            {
                showShare && (
                     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-md mx-4">
                        <div className="flex items-center mb-4">
                            
                            <h3 className="text-lg font-semibold text-gray-900">Share Note</h3>
                        </div>
                       
                        <div className="flex justify-end gap-3">
                            <Button 
                                variant="secondary" 
                                onClick={() => setshowShare(false)}
                            >
                                Cancel
                            </Button>
                            <Button 
                                variant="danger" 
                                onClick={shareNote}
                            >
                                Genrate Share Note
                            </Button>

                            <div>
                               {shareToken && (
                                    <Link to={`${window.location.origin}/share/${shareToken}`} >
                                        Link
                                    </Link>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
                )
            }

        </div>
    ) : null;
}
export default Note;