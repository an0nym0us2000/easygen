import { useState } from 'react'
import { Upload, Sparkles, Mic, FileText, Image as ImageIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import ToneModal from '../components/ToneModal'

type TabType = 'your-topic' | 'suggested'

const suggestedTopics = [
  { id: 1, title: 'The Future of Remote Work', emoji: '🏠', trending: true },
  { id: 2, title: 'AI in Software Development', emoji: '🤖', trending: true },
  { id: 3, title: 'Building Personal Brand on LinkedIn', emoji: '✨', trending: false },
  { id: 4, title: 'Mental Health for Entrepreneurs', emoji: '🧠', trending: false },
  { id: 5, title: 'Sustainable Business Practices', emoji: '🌱', trending: false },
  { id: 6, title: 'Leadership in Crisis', emoji: '💪', trending: true },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('your-topic')
  const [topic, setTopic] = useState('')
  const [selectedTone, setSelectedTone] = useState<string>('Professional')
  const [showToneModal, setShowToneModal] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [generatedPost, setGeneratedPost] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      toast.success('File uploaded successfully!')
    }
  }

  const handleGenerate = () => {
    if (topic.trim().split(' ').length < 5) {
      toast.error('Please enter at least 5 words for your topic')
      return
    }

    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      const samplePost = `🚀 ${topic}

I've been thinking a lot about this lately, and here's what I've learned:

• Innovation starts with curiosity
• Every challenge is an opportunity in disguise
• The best time to start was yesterday, the second best time is now

What we often forget is that progress isn't always linear. Sometimes we need to take a step back to leap forward.

Here's my take: ${topic.toLowerCase()} isn't just a trend—it's a fundamental shift in how we approach [industry/field].

The key is to stay adaptable, keep learning, and never stop questioning the status quo.

What's your experience with this? I'd love to hear your thoughts! 👇

#Leadership #Innovation #Growth #ProfessionalDevelopment`

      setGeneratedPost(samplePost)
      setIsGenerating(false)
      toast.success('Post generated successfully!')
    }, 2000)
  }

  const selectSuggestedTopic = (title: string) => {
    setTopic(title)
    setActiveTab('your-topic')
    toast.success('Topic selected!')
  }

  return (
    <div className="h-full flex">
      {/* Left Panel - Input */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate Post</h1>
            <p className="text-gray-600">Create engaging LinkedIn content powered by AI</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('your-topic')}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'your-topic'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Your Topic
            </button>
            <button
              onClick={() => setActiveTab('suggested')}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'suggested'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Suggested Topics
            </button>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'your-topic' ? (
              <motion.div
                key="your-topic"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Upload Zone */}
                <div className="card p-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Upload Content (Optional)</h3>
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                      dragActive
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="text-xs text-gray-500">
                      Supports: Images, Audio, Documents (PDF, DOCX)
                    </p>
                    <div className="flex gap-2 justify-center mt-4">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <ImageIcon className="w-4 h-4" />
                        <span>Image</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Mic className="w-4 h-4" />
                        <span>Audio</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FileText className="w-4 h-4" />
                        <span>Document</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Topic Input */}
                <div className="card p-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    What would you like to write about?
                  </label>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter your topic or idea (minimum 5 words)..."
                    rows={4}
                    className="input-field resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {topic.trim().split(' ').filter(word => word).length} / 5 words minimum
                  </p>
                </div>

                {/* Tone Selector */}
                <div className="card p-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Voice Tone
                  </label>
                  <button
                    onClick={() => setShowToneModal(true)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-primary transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{selectedTone}</p>
                        <p className="text-xs text-gray-500">Click to change tone</p>
                      </div>
                    </div>
                    <div className="text-primary">→</div>
                  </button>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || topic.trim().split(' ').length < 5}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Generate Post</span>
                    </>
                  )}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="suggested"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {suggestedTopics.map((topic) => (
                  <motion.button
                    key={topic.id}
                    onClick={() => selectSuggestedTopic(topic.title)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="card p-6 text-left hover:border-2 hover:border-primary transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{topic.emoji}</span>
                      {topic.trending && (
                        <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded">
                          Trending
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className="w-[420px] bg-white border-l border-gray-200 p-6 overflow-y-auto">
        <div className="sticky top-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Preview</h3>

          {generatedPost ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">JD</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">John Doe</p>
                    <p className="text-xs text-gray-500">Just now</p>
                  </div>
                </div>
                <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {generatedPost}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="btn-primary flex-1">Save Draft</button>
                <button className="btn-secondary">Edit</button>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">
                Your generated post will appear here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tone Modal */}
      <ToneModal
        isOpen={showToneModal}
        onClose={() => setShowToneModal(false)}
        selectedTone={selectedTone}
        onSelectTone={setSelectedTone}
      />
    </div>
  )
}
