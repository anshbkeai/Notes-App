import { useEffect, useState } from "react";
import notesService from "../backend/notes";
import NoteFrom from "../components/Notes-Form";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { LoadingSpinner } from "../components";

export default function EditNote() {
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { slug } = useParams();
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
    
    useEffect(() => {
        if (slug) {
            fetchNote();
        } else {
            navigate("/allNotes");
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

    return note ? <NoteFrom note={note} /> : null;
}
