import { useState } from 'react'
import { Bookmark, TrendingUp, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Saved() {
  const [savedPosts] = useState([]) // Empty by default
  const navigate = useNavigate()

  if (savedPosts.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          {/* Illustration */}
          <div className="mb-8 relative">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-primary-light/10 rounded-full flex items-center justify-center mx-auto">
              <Bookmark className="w-16 h-16 text-primary/40" />
            </div>
            {/* Decorative floating bookmarks */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-0 left-1/4 w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center"
            >
              <Bookmark className="w-4 h-4 text-primary" />
            </motion.div>
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute bottom-4 right-1/4 w-6 h-6 bg-primary-light/20 rounded-lg flex items-center justify-center"
            >
              <Bookmark className="w-3 h-3 text-primary-light" />
            </motion.div>
          </div>

          {/* Content */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No Saved Posts Yet</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Start saving posts from the Trending page to build your inspiration library.
            Save posts that resonate with you and use them as templates for your own content.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/trending')}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              Explore Trending Posts
            </button>
            <button
              onClick={() => navigate('/generate')}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Generate New Post
            </button>
          </div>

          {/* Tips */}
          <div className="mt-12 p-6 bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-2xl text-left">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-lg">💡</span>
              Pro Tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Save posts with high engagement for inspiration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Look for posts that match your voice and industry</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Use saved posts as templates when creating new content</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    )
  }

  // If there are saved posts (for future implementation)
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Bookmark className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Saved Posts</h1>
          </div>
          <p className="text-gray-600">Your collection of inspiring content</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Saved posts will be displayed here */}
        </div>
      </div>
    </div>
  )
}
