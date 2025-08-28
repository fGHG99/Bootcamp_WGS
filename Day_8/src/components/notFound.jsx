import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  const handleGoHome = () => {
    window.location.href = "/"
  }
  
  const handleGoBack = () => {
    window.history.back()
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Card Container */}
      <div className="w-full max-w-md text-center bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="pt-8 pb-8 px-6">
          {/* Large 404 Display */}
          <div className="mb-6">
            <h1 className="text-8xl font-bold text-blue-600 mb-2">404</h1>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Page Not Found</h2>
            <p className="text-gray-600 leading-relaxed">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the
              wrong URL.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={handleGoHome} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Homepage
            </button>
            
            <div className="flex gap-2">
              <button 
                onClick={handleGoBack} 
                className="flex-1 bg-transparent hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md border border-gray-300 transition-colors duration-200 flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </button>
            </div>
          </div>
          
          {/* Helpful Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Need help? Try these popular pages:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <button 
                onClick={() => (window.location.href = "/")} 
                className="text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 py-1 px-3 rounded transition-colors duration-200"
              >
                Home
              </button>
              <button 
                onClick={() => (window.location.href = "/unsplash")} 
                className="text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 py-1 px-3 rounded transition-colors duration-200"
              >
                Unsplash
              </button>
              <button 
                onClick={() => (window.location.href = "/Youtube")} 
                className="text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 py-1 px-3 rounded transition-colors duration-200"
              >
                Youtube
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}