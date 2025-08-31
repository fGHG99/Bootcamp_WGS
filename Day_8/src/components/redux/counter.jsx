import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../utils/counterSlice'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          Counter App
        </h2>
        
        <div className="flex items-center justify-center space-x-6">
          {/* Decrement Button */}
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
            className="group relative inline-flex items-center justify-center w-14 h-14 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-50"
          >
            <svg 
              className="w-6 h-6 transition-transform group-hover:scale-110" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
            </svg>
            
            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-20 group-active:animate-ping"></div>
          </button>

          {/* Counter Display */}
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold text-gray-800 tabular-nums min-w-[100px] text-center">
              {count}
            </span>
            <span className="text-sm text-gray-500 mt-1 font-medium">
              Current Value
            </span>
          </div>

          {/* Increment Button */}
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
            className="group relative inline-flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50"
          >
            <svg 
              className="w-6 h-6 transition-transform group-hover:scale-110" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
            
            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-20 group-active:animate-ping"></div>
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Click the buttons to increment or decrement
          </p>
        </div>
      </div>
    </div>
  )
}