import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router";
import {Container,  Logout } from  "../index.js"

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const authStatus = useSelector((state) => state.auth.isAuthenticated);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const location = useLocation();
    const userMenuRef = useRef(null);
    
    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navItems = [
        {
            name: "Home",
            uri: "/",
            icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
            active: true
        },
        {
            name: "Sign In",
            uri: "/login",
            icon: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1",
            active: !authStatus
        },
        {
            name: "Sign Up",
            uri: "/signup",
            icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
            active: !authStatus
        },
        {
            name: "Dashboard",
            uri: "/dashboard",
            icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
            active: authStatus
        },
        {
            name: "New Note",
            uri: "/addNote",
            icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
            active: authStatus,
            highlight: true
        }
    ];
    
    const quickActions = [
        {
            name: "All Notes",
            uri: "/allNotes",
            icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        },
        
    ];
    
    const isActive = (uri) => location.pathname === uri;
    
    const getUserInitials = () => {
        if (userData?.name) {
            return userData.name.split(' ').map(n => n[0]).join('').toUpperCase();
        }
        return userData?.email?.[0]?.toUpperCase() || 'U';
    };
    
    const handleNavigation = (uri) => {
        navigate(uri);
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-50">
            <Container>
                <nav className="flex items-center justify-between py-3">
                    {/* Logo/Brand */}
                    <div 
                        onClick={() => navigate('/')}
                        className="flex items-center space-x-3 cursor-pointer group"
                    >
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            {/* Pulse animation */}
                            <div className="absolute inset-0 w-10 h-10 bg-blue-600 rounded-xl animate-ping opacity-20"></div>
                        </div>
                        <div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                NoteHub
                            </span>
                            <div className="text-xs text-gray-500 -mt-1">Your note-taking companion</div>
                        </div>
                    </div>

                    {/* Center Navigation - Desktop */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navItems.map((item) => (
                            item.active && (
                                <button 
                                    key={item.uri} 
                                    onClick={() => handleNavigation(item.uri)}
                                    className={`
                                        flex items-center space-x-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-105
                                        ${
                                            item.highlight 
                                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800'
                                                : isActive(item.uri)
                                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:border hover:border-blue-100'
                                        }
                                    `}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                    </svg>
                                    <span>{item.name}</span>
                                </button>
                            )
                        ))}
                    </div>

                    {/* Right Side - Desktop */}
                    <div className="hidden md:flex items-center space-x-3">
                        {authStatus ? (
                            <>
                                {/* Quick Actions */}
                                <div className="flex items-center space-x-2">
                                    {quickActions.map((action) => (
                                        <button
                                            key={action.uri}
                                            onClick={() => navigate(action.uri)}
                                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:scale-110"
                                            title={action.name}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                                            </svg>
                                        </button>
                                    ))}
                                    
                                    {/* Notifications */}
                                    
                                </div>

                                {/* User Profile Dropdown */}
                                <div className="relative" ref={userMenuRef}>
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                                    >
                                        <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-md group-hover:shadow-lg transition-all duration-300">
                                            {getUserInitials()}
                                        </div>
                                        <div className="hidden xl:block text-left">
                                            <div className="text-sm font-semibold text-gray-900">
                                                {userData?.name || 'User'}
                                            </div>
                                            <div className="text-xs text-gray-500 -mt-0.5">
                                                {userData?.email}
                                            </div>
                                        </div>
                                        <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* User Dropdown Menu */}
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                                                        {getUserInitials()}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900">
                                                            {userData?.name || 'User'}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {userData?.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="py-2">
                                                
                                               
                                                
                                                <div className="border-t border-gray-100 my-2"></div>
                                                
                                                <div className="px-4 py-2">
                                                    <Logout />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-3">
                                {navItems.filter(item => !authStatus && item.active).map((item) => (
                                    <button 
                                        key={item.uri} 
                                        onClick={() => handleNavigation(item.uri)}
                                        className={`
                                            flex items-center space-x-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-105
                                            ${
                                                item.name === 'Sign Up'
                                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800'
                                                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 border border-gray-200 hover:border-blue-200'
                                            }
                                        `}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                        </svg>
                                        <span>{item.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-2">
                        {authStatus && (
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-xs shadow-md">
                                {getUserInitials()}
                            </div>
                        )}
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm">
                        <div className="py-4 space-y-2">
                            {navItems.map((item) => (
                                item.active && (
                                    <button 
                                        key={item.uri} 
                                        onClick={() => handleNavigation(item.uri)}
                                        className={`
                                            flex items-center space-x-3 w-full px-4 py-3 text-left text-sm font-medium rounded-xl mx-2 transition-all duration-300
                                            ${
                                                item.highlight 
                                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                                                    : isActive(item.uri)
                                                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                            }
                                        `}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                        </svg>
                                        <span>{item.name}</span>
                                    </button>
                                )
                            ))}
                            
                            {authStatus && (
                                <>
                                    <div className="border-t border-gray-200 my-4 mx-4"></div>
                                    <div className="px-4">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                                                {getUserInitials()}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">
                                                    {userData?.name || 'User'}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {userData?.email}
                                                </div>
                                            </div>
                                        </div>
                                        <Logout />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </Container>
        </header>
    )

}
export default Header;