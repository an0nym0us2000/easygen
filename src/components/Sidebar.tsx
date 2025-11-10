import { NavLink } from 'react-router-dom'
import {
  PenLine,
  FileText,
  TrendingUp,
  Users,
  BarChart3,
  Bookmark,
  Calendar as CalendarIcon,
  Settings as SettingsIcon,
  Sparkles,
} from 'lucide-react'

const navigation = [
  { name: 'Generate Post', href: '/generate', icon: PenLine },
  { name: 'My Posts', href: '/my-posts', icon: FileText },
  { name: 'Trending', href: '/trending', icon: TrendingUp },
  { name: 'Creators', href: '/creators', icon: Users, disabled: true },
  { name: 'Engagement', href: '/engagement', icon: BarChart3, disabled: true },
  { name: 'Saved', href: '/saved', icon: Bookmark },
  { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
  { name: 'Settings', href: '/settings', icon: SettingsIcon },
]

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">EasyGen</h1>
            <p className="text-xs text-gray-500">AI Content Studio</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon
          if (item.disabled) {
            return (
              <div
                key={item.name}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 cursor-not-allowed opacity-50"
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
                <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded">Soon</span>
              </div>
            )
          }
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? 'active' : ''}`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="bg-gradient-to-br from-primary/10 to-primary-light/10 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Upgrade to Pro</h3>
              <p className="text-xs text-gray-600 mb-3">Unlock unlimited posts and premium tones</p>
              <button className="w-full bg-primary text-white text-xs font-medium px-3 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
