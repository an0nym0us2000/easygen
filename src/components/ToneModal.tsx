import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface ToneModalProps {
  isOpen: boolean
  onClose: () => void
  selectedTone: string
  onSelectTone: (tone: string) => void
}

const tones = [
  {
    name: 'Professional',
    emoji: '💼',
    description: 'Formal, authoritative, and business-focused',
    color: 'from-blue-500/10 to-blue-600/10',
    borderColor: 'border-blue-200',
  },
  {
    name: 'Narrative',
    emoji: '📖',
    description: 'Story-driven, personal, and engaging',
    color: 'from-purple-500/10 to-purple-600/10',
    borderColor: 'border-purple-200',
  },
  {
    name: 'Visionary',
    emoji: '🚀',
    description: 'Forward-thinking, inspiring, and ambitious',
    color: 'from-indigo-500/10 to-indigo-600/10',
    borderColor: 'border-indigo-200',
  },
  {
    name: 'Empathic',
    emoji: '❤️',
    description: 'Warm, understanding, and supportive',
    color: 'from-pink-500/10 to-pink-600/10',
    borderColor: 'border-pink-200',
  },
  {
    name: 'Witty',
    emoji: '😄',
    description: 'Humorous, clever, and entertaining',
    color: 'from-yellow-500/10 to-yellow-600/10',
    borderColor: 'border-yellow-200',
  },
  {
    name: 'Contrarian',
    emoji: '🤔',
    description: 'Challenge norms, provoke thought',
    color: 'from-red-500/10 to-red-600/10',
    borderColor: 'border-red-200',
  },
  {
    name: 'Leadership',
    emoji: '👑',
    description: 'Confident, decisive, and motivating',
    color: 'from-amber-500/10 to-amber-600/10',
    borderColor: 'border-amber-200',
  },
  {
    name: 'Educational',
    emoji: '📚',
    description: 'Informative, clear, and teaching-focused',
    color: 'from-green-500/10 to-green-600/10',
    borderColor: 'border-green-200',
  },
  {
    name: 'Analytical',
    emoji: '📊',
    description: 'Data-driven, logical, and detailed',
    color: 'from-cyan-500/10 to-cyan-600/10',
    borderColor: 'border-cyan-200',
  },
  {
    name: 'Inspirational',
    emoji: '✨',
    description: 'Uplifting, motivational, and positive',
    color: 'from-violet-500/10 to-violet-600/10',
    borderColor: 'border-violet-200',
  },
  {
    name: 'Casual',
    emoji: '👋',
    description: 'Friendly, relaxed, and conversational',
    color: 'from-teal-500/10 to-teal-600/10',
    borderColor: 'border-teal-200',
  },
  {
    name: 'Urgent',
    emoji: '⚡',
    description: 'Time-sensitive, action-oriented',
    color: 'from-orange-500/10 to-orange-600/10',
    borderColor: 'border-orange-200',
  },
]

export default function ToneModal({ isOpen, onClose, selectedTone, onSelectTone }: ToneModalProps) {
  const [tempTone, setTempTone] = useState(selectedTone)
  const [intensity, setIntensity] = useState(50)
  const [customTone, setCustomTone] = useState('')
  const [customDescription, setCustomDescription] = useState('')

  const handleApply = () => {
    onSelectTone(customTone || tempTone)
    toast.success(`Tone set to ${customTone || tempTone}`)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Select Voice Tone</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Choose the tone that best fits your message
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Tone Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                  {tones.map((tone) => (
                    <motion.button
                      key={tone.name}
                      onClick={() => {
                        setTempTone(tone.name)
                        setCustomTone('')
                      }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        tempTone === tone.name && !customTone
                          ? `bg-gradient-to-br ${tone.color} ${tone.borderColor} border-2`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{tone.emoji}</div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{tone.name}</h3>
                      <p className="text-xs text-gray-600 leading-snug">{tone.description}</p>
                    </motion.button>
                  ))}
                </div>

                {/* Custom Tone */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Custom Tone</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={customTone}
                      onChange={(e) => {
                        setCustomTone(e.target.value)
                        if (e.target.value) setTempTone('')
                      }}
                      placeholder="Enter your custom tone name..."
                      className="input-field"
                    />
                    <textarea
                      value={customDescription}
                      onChange={(e) => setCustomDescription(e.target.value)}
                      placeholder="Describe how this tone should sound (optional)..."
                      rows={2}
                      className="input-field resize-none"
                    />
                  </div>
                </div>

                {/* Intensity Slider */}
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Tone Intensity</h3>
                    <span className="text-sm font-medium text-primary">{intensity}%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500">Subtle</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={intensity}
                      onChange={(e) => setIntensity(Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                    />
                    <span className="text-xs text-gray-500">Bold</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                <button onClick={onClose} className="btn-secondary">
                  Cancel
                </button>
                <button onClick={handleApply} className="btn-primary">
                  Apply Tone
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
