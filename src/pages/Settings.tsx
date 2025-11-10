import { useState } from 'react'
import { Settings as SettingsIcon, Upload, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

type TabType = 'info' | 'preferences'

const jobDescriptionItems = [
  'Content Strategist',
  'Thought Leader',
  'Industry Expert',
  'Educator',
  'Entrepreneur',
  'Community Builder',
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState<TabType>('info')
  const [profilePhoto, setProfilePhoto] = useState('')
  const [fullName, setFullName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/in/johndoe')
  const [timezone, setTimezone] = useState('America/New_York')
  const [selectedJobs, setSelectedJobs] = useState<string[]>(['Content Strategist'])

  const [defaultTone, setDefaultTone] = useState('Professional')
  const [postLength, setPostLength] = useState('medium')
  const [includeEmojis, setIncludeEmojis] = useState(true)
  const [includeHashtags, setIncludeHashtags] = useState(true)
  const [aiPreferences, setAiPreferences] = useState('Focus on actionable insights and data-driven content. Keep tone professional but approachable.')

  const handleSaveChanges = () => {
    toast.success('Settings saved successfully')
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string)
        toast.success('Profile photo updated')
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleJobDescription = (job: string) => {
    if (selectedJobs.includes(job)) {
      setSelectedJobs(selectedJobs.filter(j => j !== job))
    } else {
      setSelectedJobs([...selectedJobs, job])
    }
  }

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      <div className="max-w-5xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <SettingsIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          </div>
          <p className="text-gray-600">Manage your account and AI preferences</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'info'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            My Info
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'preferences'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Preferences
          </button>
        </div>

        {/* Content */}
        {activeTab === 'info' ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Profile Photo */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Photo</h3>
              <div className="flex items-center gap-6">
                <div className="relative">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                      <span className="text-white text-2xl font-semibold">JD</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="btn-secondary cursor-pointer inline-flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    JPG, PNG or GIF. Max size 5MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="input-field"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Paris">Paris (CET)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                    <option value="Australia/Sydney">Sydney (AEST)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Description</h3>
              <p className="text-sm text-gray-600 mb-4">
                Select roles that best describe your professional identity
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {jobDescriptionItems.map((job) => (
                  <button
                    key={job}
                    onClick={() => toggleJobDescription(job)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      selectedJobs.includes(job)
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{job}</span>
                      {selectedJobs.includes(job) && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button onClick={handleSaveChanges} className="btn-primary">
                Save Changes
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Default Tone */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Default Voice Tone</h3>
              <select
                value={defaultTone}
                onChange={(e) => setDefaultTone(e.target.value)}
                className="input-field"
              >
                <option value="Professional">Professional</option>
                <option value="Narrative">Narrative</option>
                <option value="Visionary">Visionary</option>
                <option value="Empathic">Empathic</option>
                <option value="Witty">Witty</option>
                <option value="Contrarian">Contrarian</option>
                <option value="Leadership">Leadership</option>
                <option value="Educational">Educational</option>
              </select>
            </div>

            {/* Post Length */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Default Post Length</h3>
              <div className="space-y-3">
                {[
                  { value: 'short', label: 'Short', desc: '~100-150 words' },
                  { value: 'medium', label: 'Medium', desc: '~200-300 words' },
                  { value: 'long', label: 'Long', desc: '~400-500 words' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      postLength === option.value
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="postLength"
                      value={option.value}
                      checked={postLength === option.value}
                      onChange={(e) => setPostLength(e.target.value)}
                      className="w-4 h-4 text-primary"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Content Preferences */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Preferences</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div>
                    <div className="font-medium text-gray-900">Include Emojis</div>
                    <div className="text-sm text-gray-600">Add relevant emojis to posts</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeEmojis}
                    onChange={(e) => setIncludeEmojis(e.target.checked)}
                    className="w-5 h-5 text-primary rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div>
                    <div className="font-medium text-gray-900">Include Hashtags</div>
                    <div className="text-sm text-gray-600">Generate relevant hashtags</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeHashtags}
                    onChange={(e) => setIncludeHashtags(e.target.checked)}
                    className="w-5 h-5 text-primary rounded"
                  />
                </label>
              </div>
            </div>

            {/* AI Preferences */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Fine-tune Your AI Preferences
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Tell the AI about your writing style, topics of interest, and content goals
              </p>
              <textarea
                value={aiPreferences}
                onChange={(e) => setAiPreferences(e.target.value)}
                rows={6}
                placeholder="E.g., I prefer data-driven content with actionable takeaways. Focus on technology trends, leadership insights, and startup growth strategies..."
                className="input-field resize-none"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button onClick={handleSaveChanges} className="btn-primary">
                Save Preferences
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
