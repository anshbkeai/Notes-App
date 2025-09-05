import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Container } from "../components";
import { useEffect } from "react";

const Landing = () => {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.isAuthenticated);
    const userData = useSelector((state) => state.auth.userData);

    // Redirect authenticated users to dashboard
    useEffect(() => {
        if (authStatus) {
            navigate('/dashboard');
        }
    }, [authStatus, navigate]);

    const features = [
        {
            icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
            title: "Rich Text Editor",
            description: "Write with a powerful editor that supports formatting, images, and more."
        },
        {
            icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
            title: "Organize & Search",
            description: "Keep your notes organized and find them quickly with powerful search."
        },
        {
            icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
            title: "Secure & Private",
            description: "Your notes are secure with user authentication and private access."
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <Container>
                    <div className="text-center relative z-10">
                        {/* Main Hero Content */}
                        <div className="max-w-4xl mx-auto mb-16">
                            <div className="flex justify-center mb-8">
                                <div className="relative">
                                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl">
                                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    {/* Pulse effect */}
                                    <div className="absolute inset-0 w-20 h-20 bg-blue-600 rounded-2xl animate-ping opacity-20"></div>
                                </div>
                            </div>
                            
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Welcome to{" "}
                                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                    NoteHub
                                </span>
                            </h1>
                            
                            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
                                Your personal note-taking companion. Capture ideas, organize thoughts, 
                                and never lose track of what matters most to you.
                            </p>
                            
                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-lg"
                                >
                                    Get Started Free
                                </button>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="w-full sm:w-auto px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 text-lg"
                                >
                                    Sign In
                                </button>
                            </div>
                            
                            {/* Social Proof */}
                            <div className="text-center">
                                <p className="text-sm text-gray-500 mb-4">Trusted by note-takers worldwide</p>
                                <div className="flex justify-center items-center space-x-8 opacity-60">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium">Free Forever</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium">Secure & Private</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white/50 backdrop-blur-sm">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Everything you need to stay organized
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Powerful features designed to make note-taking effortless and enjoyable.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <Container>
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute top-0 -left-4 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                            <div className="absolute top-0 -right-4 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                            <div className="absolute -bottom-8 left-20 w-32 h-32 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
                        </div>
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ready to get organized?
                            </h2>
                            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                                Join thousands of users who have transformed their note-taking experience with NoteHub.
                            </p>
                            <button
                                onClick={() => navigate('/signup')}
                                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg text-lg"
                            >
                                Start Taking Notes Today
                            </button>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default Landing;
