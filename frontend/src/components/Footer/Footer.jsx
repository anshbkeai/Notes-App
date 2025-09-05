import { Container } from '../index';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-auto">
            <Container>
                <div className="py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Logo and Brand */}
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                    NoteHub
                                </div>
                                <div className="text-xs text-gray-500">
                                    Your notes, organized
                                </div>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="flex items-center space-x-8 text-sm">
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                                Features
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                                Help Center
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                                Privacy
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                                Contact
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center space-x-4">
                            <a href="#" className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                </svg>
                            </a>
                            <a href="#" className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.120.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                                </svg>
                            </a>
                            <a href="#" className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.374 0 0 5.373 0 12 0 24 12 24 12 24s12 0 12-12c0-6.627-5.373-12-12-12zM9.5 17.5c0-1.381-1.119-2.5-2.5-2.5s-2.5 1.119-2.5 2.5 1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5zM15.5 17.5c0-1.381-1.119-2.5-2.5-2.5s-2.5 1.119-2.5 2.5 1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5zM12 10.5c0-1.381-1.119-2.5-2.5-2.5S7 9.119 7 10.5s1.119 2.5 2.5 2.5S12 11.881 12 10.5z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    
                    {/* Divider */}
                    <div className="border-t border-gray-200 mt-6 pt-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-gray-500">
                                © {currentYear} NoteHub. All rights reserved.
                            </p>
                            <p className="text-xs text-gray-400">
                                Made with ❤️ for better note-taking
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
export default Footer;