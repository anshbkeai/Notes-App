import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import notesService from "../backend/notes";
import NotesCard from "../components/NoteCard";
import { Container, LoadingSpinner, EmptyState } from "../components";

const Home = () => {
    const authStatus = useSelector((state) => state.auth.isAuthenticated);
    const userData = useSelector((state) => state.auth.userData);
    const token = useSelector((state) => state.auth.token);
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (authStatus && token) {
            setIsLoading(true);
            notesService.getAllNotes({ token })
                .then(data => {
                    setNotes(data || []);
                    setError(null);
                })
                .catch(err => {
                    console.error('Error fetching notes:', err);
                    setError('Failed to load notes');
                    setNotes([]);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, [authStatus, token]);

    if (!authStatus) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Container>
                    <div className="text-center py-16">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-8">
                            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to NoteHub</h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Your personal note-taking companion. Organize your thoughts, capture ideas, and keep track of what matters most.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate('/login')}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => navigate('/signup')}
                                className="px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
                            >
                                Create Account
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <Container>
                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Welcome back{userData?.name ? `, ${userData.name}` : ''}!
                            </h1>
                            <p className="text-gray-600 text-lg">
                                {notes.length > 0 
                                    ? `You have ${notes.length} note${notes.length !== 1 ? 's' : ''}`
                                    : 'Ready to start writing your first note?'
                                }
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate('/addNote')}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                New Note
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                {isLoading ? (
                    <div className="flex justify-center py-16">
                        <LoadingSpinner size="lg" text="Loading your notes..." />
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                        <div className="text-red-600 mb-2">⚠️ {error}</div>
                        <button
                            onClick={() => window.location.reload()}
                            className="text-red-600 hover:text-red-700 font-medium underline"
                        >
                            Try again
                        </button>
                    </div>
                ) : notes.length === 0 ? (
                    <EmptyState
                        title="No notes yet"
                        description="Start documenting your ideas, thoughts, and important information. Your first note is just a click away!"
                        actionText="Create First Note"
                        onAction={() => navigate('/addNote')}
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <div key={note._id || note.slug} className="transform transition-all duration-200 hover:scale-[1.02]">
                                <NotesCard note={note} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
};
export default Home;