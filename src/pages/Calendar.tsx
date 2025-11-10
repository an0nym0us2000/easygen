import { useState } from 'react'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Download, Plus, X } from 'lucide-react'
import { format, startOfWeek, addDays, addWeeks, subWeeks, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

interface ScheduledPost {
  id: number
  title: string
  date: Date
  time: string
  status: 'scheduled' | 'published'
}

const mockScheduledPosts: ScheduledPost[] = [
  {
    id: 1,
    title: 'The Future of Remote Work',
    date: new Date(2024, 0, 16, 9, 0),
    time: '09:00',
    status: 'scheduled',
  },
  {
    id: 2,
    title: 'AI in Software Development',
    date: new Date(2024, 0, 17, 14, 0),
    time: '14:00',
    status: 'scheduled',
  },
  {
    id: 3,
    title: 'Building Personal Brand',
    date: new Date(2024, 0, 18, 10, 30),
    time: '10:30',
    status: 'scheduled',
  },
]

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'week' | 'month'>('week')
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>(mockScheduledPosts)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState('09:00')
  const [selectedPost, setSelectedPost] = useState('')
  const [notes, setNotes] = useState('')

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 })
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const hours = Array.from({ length: 24 }, (_, i) => i)

  const handlePreviousPeriod = () => {
    if (view === 'week') {
      setCurrentDate(subWeeks(currentDate, 1))
    }
  }

  const handleNextPeriod = () => {
    if (view === 'week') {
      setCurrentDate(addWeeks(currentDate, 1))
    }
  }

  const handleSchedulePost = () => {
    if (!selectedPost.trim()) {
      toast.error('Please enter a post title')
      return
    }

    const newPost: ScheduledPost = {
      id: Math.max(...scheduledPosts.map(p => p.id), 0) + 1,
      title: selectedPost,
      date: new Date(selectedDate.setHours(parseInt(selectedTime.split(':')[0]), parseInt(selectedTime.split(':')[1]))),
      time: selectedTime,
      status: 'scheduled',
    }

    setScheduledPosts([...scheduledPosts, newPost])
    toast.success('Post scheduled successfully')
    setShowScheduleModal(false)
    setSelectedPost('')
    setNotes('')
  }

  const getPostsForDay = (day: Date) => {
    return scheduledPosts.filter(post => isSameDay(post.date, day))
  }

  const handleExportCSV = () => {
    const csv = [
      ['Title', 'Date', 'Time', 'Status'],
      ...scheduledPosts.map(post => [
        post.title,
        format(post.date, 'yyyy-MM-dd'),
        post.time,
        post.status
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'scheduled-posts.csv'
    a.click()
    toast.success('Calendar exported')
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Content Calendar</h1>
              <p className="text-sm text-gray-600">Schedule and manage your posts</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="btn-secondary flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Schedule Post
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePreviousPeriod}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900 min-w-[200px] text-center">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <button
              onClick={handleNextPeriod}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setView('week')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setView('month')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div className="flex-1 overflow-auto bg-gray-50 p-8">
        {view === 'week' ? (
          <div className="bg-white rounded-card shadow-card overflow-hidden">
            {/* Week Header */}
            <div className="grid grid-cols-8 border-b border-gray-200">
              <div className="p-4 border-r border-gray-200"></div>
              {weekDays.map((day) => (
                <div
                  key={day.toString()}
                  className="p-4 text-center border-r border-gray-200 last:border-r-0"
                >
                  <div className="text-xs text-gray-500 mb-1">{format(day, 'EEE')}</div>
                  <div className={`text-lg font-semibold ${
                    isToday(day) ? 'text-primary' : 'text-gray-900'
                  }`}>
                    {format(day, 'd')}
                  </div>
                </div>
              ))}
            </div>

            {/* Week Grid */}
            <div className="grid grid-cols-8">
              {/* Time column */}
              <div className="border-r border-gray-200">
                {hours.map((hour) => (
                  <div key={hour} className="h-16 border-b border-gray-100 px-3 py-2">
                    <span className="text-xs text-gray-500">
                      {format(new Date().setHours(hour, 0), 'HH:mm')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Day columns */}
              {weekDays.map((day) => (
                <div key={day.toString()} className="border-r border-gray-200 last:border-r-0">
                  {hours.map((hour) => {
                    const dayPosts = getPostsForDay(day).filter(
                      post => post.date.getHours() === hour
                    )
                    return (
                      <div
                        key={hour}
                        className="h-16 border-b border-gray-100 p-1 hover:bg-gray-50 transition-colors"
                      >
                        {dayPosts.map((post) => (
                          <div
                            key={post.id}
                            className="bg-primary/10 border-l-2 border-primary rounded px-2 py-1 text-xs"
                          >
                            <div className="font-medium text-gray-900 truncate">{post.title}</div>
                            <div className="text-gray-600">{post.time}</div>
                          </div>
                        ))}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-card shadow-card p-6">
            <div className="grid grid-cols-7 gap-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-center font-semibold text-gray-700 text-sm">
                  {day}
                </div>
              ))}
              {monthDays.map((day) => {
                const dayPosts = getPostsForDay(day)
                return (
                  <div
                    key={day.toString()}
                    className={`aspect-square border rounded-lg p-2 hover:border-primary transition-colors ${
                      isSameMonth(day, currentDate) ? 'bg-white' : 'bg-gray-50'
                    } ${isToday(day) ? 'border-primary' : 'border-gray-200'}`}
                  >
                    <div className={`text-sm font-medium mb-1 ${
                      isToday(day) ? 'text-primary' : 'text-gray-900'
                    }`}>
                      {format(day, 'd')}
                    </div>
                    <div className="space-y-1">
                      {dayPosts.map((post) => (
                        <div
                          key={post.id}
                          className="text-xs bg-primary/10 px-1 py-0.5 rounded truncate"
                        >
                          {post.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Schedule Post Modal */}
      <AnimatePresence>
        {showScheduleModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowScheduleModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
                <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Schedule Post</h2>
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Post Title
                    </label>
                    <input
                      type="text"
                      value={selectedPost}
                      onChange={(e) => setSelectedPost(e.target.value)}
                      placeholder="Enter post title..."
                      className="input-field"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        value={format(selectedDate, 'yyyy-MM-dd')}
                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Time
                      </label>
                      <input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add any notes or reminders..."
                      rows={3}
                      className="input-field resize-none"
                    />
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button onClick={handleSchedulePost} className="btn-primary">
                    Schedule Post
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
