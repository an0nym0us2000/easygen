import { useState } from 'react'
import { TrendingUp, Heart, MessageCircle, Repeat2, Copy, Bookmark, Sparkles, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface TrendingPost {
  id: number
  author: {
    name: string
    title: string
    avatar: string
  }
  content: string
  metrics: {
    likes: number
    comments: number
    reposts: number
  }
  outlierIndex: number
  timeRange: string
  tone: string
}

const mockTrendingPosts: TrendingPost[] = [
  {
    id: 1,
    author: { name: 'Sarah Chen', title: 'VP of Engineering @ TechCorp', avatar: 'SC' },
    content: '🚀 Just shipped our biggest feature yet!\n\nAfter 6 months of hard work, our team delivered a platform that scales to millions...',
    metrics: { likes: 1247, comments: 89, reposts: 234 },
    outlierIndex: 94,
    timeRange: '2 hours ago',
    tone: 'Leadership',
  },
  {
    id: 2,
    author: { name: 'Michael Torres', title: 'Startup Founder & CEO', avatar: 'MT' },
    content: '💡 Unpopular opinion:\n\nThe best time to start your company is when everyone thinks it\'s a bad idea...',
    metrics: { likes: 892, comments: 156, reposts: 178 },
    outlierIndex: 88,
    timeRange: '4 hours ago',
    tone: 'Contrarian',
  },
  {
    id: 3,
    author: { name: 'Emily Johnson', title: 'Product Designer', avatar: 'EJ' },
    content: '✨ Design isn\'t just about making things pretty.\n\nIt\'s about solving real problems for real people...',
    metrics: { likes: 654, comments: 42, reposts: 91 },
    outlierIndex: 82,
    timeRange: '6 hours ago',
    tone: 'Professional',
  },
  {
    id: 4,
    author: { name: 'David Park', title: 'AI Research Lead', avatar: 'DP' },
    content: '🤖 AI isn\'t replacing developers.\n\nIt\'s making us more creative, more efficient, and more impactful...',
    metrics: { likes: 2134, comments: 278, reposts: 456 },
    outlierIndex: 96,
    timeRange: '1 day ago',
    tone: 'Visionary',
  },
  {
    id: 5,
    author: { name: 'Lisa Wang', title: 'Marketing Director', avatar: 'LW' },
    content: '📊 Data I wish I knew before launching our product:\n\n• 80% of growth comes from word of mouth\n• Features don\'t sell, stories do...',
    metrics: { likes: 1567, comments: 112, reposts: 289 },
    outlierIndex: 91,
    timeRange: '1 day ago',
    tone: 'Educational',
  },
  {
    id: 6,
    author: { name: 'James Miller', title: 'Engineering Manager', avatar: 'JM' },
    content: '🔥 Hot take: Code reviews are overrated.\n\nHear me out before you unfollow...',
    metrics: { likes: 743, comments: 198, reposts: 134 },
    outlierIndex: 85,
    timeRange: '2 days ago',
    tone: 'Contrarian',
  },
]

export default function Trending() {
  const [posts] = useState<TrendingPost[]>(mockTrendingPosts)
  const [creatorFilter, setCreatorFilter] = useState('All Creators')
  const [outlierFilter, setOutlierFilter] = useState('All Scores')
  const [timeFilter, setTimeFilter] = useState('Last 7 Days')
  const [showCreatorMenu, setShowCreatorMenu] = useState(false)
  const [showOutlierMenu, setShowOutlierMenu] = useState(false)
  const [showTimeMenu, setShowTimeMenu] = useState(false)

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success('Post copied to clipboard')
  }

  const handleSave = (postId: number) => {
    toast.success('Post saved')
  }

  const handleRepurpose = (postId: number) => {
    toast.success('Post added to drafts for repurposing')
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Trending Posts</h1>
          </div>
          <p className="text-gray-600">Discover high-performing content from top creators</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {/* Creator Filter */}
          <div className="relative">
            <button
              onClick={() => setShowCreatorMenu(!showCreatorMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">{creatorFilter}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {showCreatorMenu && (
              <div className="absolute top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
                {['All Creators', 'Founders', 'Engineers', 'Designers', 'Marketers'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setCreatorFilter(filter)
                      setShowCreatorMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Outlier Index Filter */}
          <div className="relative">
            <button
              onClick={() => setShowOutlierMenu(!showOutlierMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">{outlierFilter}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {showOutlierMenu && (
              <div className="absolute top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
                {['All Scores', '90+ (Elite)', '80-89 (Great)', '70-79 (Good)'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setOutlierFilter(filter)
                      setShowOutlierMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Time Range Filter */}
          <div className="relative">
            <button
              onClick={() => setShowTimeMenu(!showTimeMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">{timeFilter}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {showTimeMenu && (
              <div className="absolute top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
                {['Last 24 Hours', 'Last 7 Days', 'Last 30 Days', 'All Time'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setTimeFilter(filter)
                      setShowTimeMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-5 group"
            >
              {/* Author */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-semibold">{post.author.avatar}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{post.author.name}</p>
                    <p className="text-xs text-gray-500 truncate">{post.author.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-gradient-to-r from-primary/10 to-primary-light/10 px-2 py-1 rounded-lg">
                  <TrendingUp className="w-3 h-3 text-primary" />
                  <span className="text-xs font-bold text-primary">{post.outlierIndex}</span>
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap line-clamp-6">
                  {post.content}
                </p>
              </div>

              {/* Tone Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                  <Sparkles className="w-3 h-3" />
                  {post.tone}
                </span>
              </div>

              {/* Metrics */}
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{post.metrics.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.metrics.comments}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Repeat2 className="w-4 h-4" />
                  <span>{post.metrics.reposts}</span>
                </div>
                <span className="ml-auto text-xs">{post.timeRange}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleCopy(post.content)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-700 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </button>
                <button
                  onClick={() => handleSave(post.id)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-700 transition-colors"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  Save
                </button>
                <button
                  onClick={() => handleRepurpose(post.id)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg text-xs font-medium text-primary transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Repurpose
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
