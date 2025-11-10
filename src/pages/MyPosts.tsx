import { useState } from 'react'
import { Plus, Calendar, Edit2, Trash2, Copy, Eye, MoreVertical } from 'lucide-react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

interface Post {
  id: number
  title: string
  content: string
  date: Date
  status: 'draft' | 'scheduled' | 'published'
  tone: string
}

const mockPosts: Post[] = [
  {
    id: 1,
    title: 'The Future of Remote Work',
    content: '🚀 The Future of Remote Work\n\nI\'ve been thinking a lot about this lately...',
    date: new Date(2024, 0, 15),
    status: 'draft',
    tone: 'Professional',
  },
  {
    id: 2,
    title: 'AI in Software Development',
    content: '🤖 AI is transforming how we build software...',
    date: new Date(2024, 0, 14),
    status: 'draft',
    tone: 'Visionary',
  },
  {
    id: 3,
    title: 'Building Personal Brand',
    content: '✨ Your personal brand is your superpower...',
    date: new Date(2024, 0, 13),
    status: 'scheduled',
    tone: 'Inspirational',
  },
  {
    id: 4,
    title: 'Mental Health for Entrepreneurs',
    content: '🧠 Let\'s talk about something important...',
    date: new Date(2024, 0, 12),
    status: 'published',
    tone: 'Empathic',
  },
]

export default function MyPosts() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [selectedPost, setSelectedPost] = useState<Post | null>(posts[0])
  const [editContent, setEditContent] = useState(posts[0].content)
  const [showMenu, setShowMenu] = useState<number | null>(null)

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post)
    setEditContent(post.content)
    setShowMenu(null)
  }

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(p => p.id !== postId))
    if (selectedPost?.id === postId) {
      setSelectedPost(posts[0])
      setEditContent(posts[0].content)
    }
    toast.success('Post deleted')
  }

  const handleDuplicatePost = (post: Post) => {
    const newPost = {
      ...post,
      id: Math.max(...posts.map(p => p.id)) + 1,
      title: `${post.title} (Copy)`,
      date: new Date(),
    }
    setPosts([newPost, ...posts])
    toast.success('Post duplicated')
  }

  const handleSave = () => {
    if (selectedPost) {
      setPosts(posts.map(p =>
        p.id === selectedPost.id ? { ...p, content: editContent } : p
      ))
      toast.success('Changes saved')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-700'
      case 'scheduled':
        return 'bg-blue-100 text-blue-700'
      case 'published':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="h-full flex">
      {/* Left Panel - Posts List */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">My Posts</h2>
            <button className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium">
              All ({posts.length})
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
              Drafts ({posts.filter(p => p.status === 'draft').length})
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
              Published ({posts.filter(p => p.status === 'published').length})
            </button>
          </div>
        </div>

        {/* Posts List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.01 }}
              onClick={() => handleSelectPost(post)}
              className={`p-4 rounded-xl cursor-pointer transition-all relative ${
                selectedPost?.id === post.id
                  ? 'bg-primary/10 border-2 border-primary'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-sm line-clamp-1 flex-1">
                  {post.title}
                </h3>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowMenu(showMenu === post.id ? null : post.id)
                    }}
                    className="p-1 hover:bg-white rounded transition-colors"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>

                  {showMenu === post.id && (
                    <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDuplicatePost(post)
                          setShowMenu(null)
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        Duplicate
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeletePost(post.id)
                          setShowMenu(null)
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{post.content}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(post.status)}`}>
                  {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                </span>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{format(post.date, 'MMM d, yyyy')}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Panel - Editor */}
      <div className="flex-1 flex flex-col">
        {selectedPost ? (
          <>
            {/* Editor Header */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  value={selectedPost.title}
                  onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
                  className="text-2xl font-bold text-gray-900 bg-transparent border-none outline-none flex-1"
                />
                <div className="flex items-center gap-2">
                  <button className="btn-secondary flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                    <Edit2 className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className={`px-3 py-1 rounded-lg ${getStatusColor(selectedPost.status)}`}>
                  {selectedPost.status.charAt(0).toUpperCase() + selectedPost.status.slice(1)}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {format(selectedPost.date, 'MMMM d, yyyy')}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg">
                  {selectedPost.tone}
                </span>
              </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
              <div className="max-w-3xl mx-auto">
                <div className="card p-8">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full h-[600px] text-gray-700 bg-transparent border-none outline-none resize-none font-normal leading-relaxed"
                    placeholder="Start writing your post..."
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit2 className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No post selected</h3>
              <p className="text-gray-600 mb-6">Select a post from the list to start editing</p>
              <button className="btn-primary flex items-center gap-2 mx-auto">
                <Plus className="w-5 h-5" />
                Create New Post
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
