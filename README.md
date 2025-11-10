# EasyGen - AI Content Generation Platform

A modern, polished SaaS web application for AI-powered LinkedIn content generation and publishing. Built with React, TypeScript, Tailwind CSS, and Framer Motion.

![EasyGen Platform](https://img.shields.io/badge/version-1.0.0-blue) ![React](https://img.shields.io/badge/react-18.2.0-61dafb) ![TypeScript](https://img.shields.io/badge/typescript-5.2.2-3178c6) ![Tailwind](https://img.shields.io/badge/tailwind-3.3.6-38bdf8)

## ✨ Features

### 🚀 Content Generation
- **Two-Tab Input System**: "Your Topic" and "Suggested Topics"
- **Drag-and-Drop Upload**: Support for images, audio, and documents
- **AI-Powered Generation**: Create engaging LinkedIn posts with AI
- **12+ Voice Tones**: Professional, Narrative, Visionary, Empathic, Witty, Contrarian, Leadership, and more
- **Tone Intensity Control**: Slider to adjust tone strength (0-100%)
- **Real-time Preview**: See your generated post as you create it

### 📝 Post Management
- **Draft System**: Save and manage multiple post drafts
- **Rich Editor**: Full-featured editor with live preview
- **Post Status Tracking**: Draft, Scheduled, Published states
- **Quick Actions**: Copy, duplicate, delete, and edit posts
- **Metadata Display**: View creation date, tone, and status at a glance

### 📈 Trending Discovery
- **Masonry Grid Layout**: Beautiful card-based trending posts display
- **Advanced Filters**: Filter by creator type, outlier score, and time range
- **Outlier Index**: See engagement scores (0-100) for each post
- **Engagement Metrics**: View likes, comments, and reposts
- **Quick Actions**: Copy, save, and repurpose trending content
- **Floating Action Buttons**: Smooth hover-reveal interactions

### 📅 Content Calendar
- **Week/Month Views**: Toggle between detailed week and overview month views
- **Drag-and-Drop Scheduling**: Intuitive post scheduling interface
- **Time-slot Grid**: 24-hour timeline with visual post placement
- **Schedule Modal**: Clean interface for scheduling new posts
- **Export to CSV**: Download your content calendar
- **Visual Indicators**: Color-coded status badges

### 💾 Saved Posts
- **Beautiful Empty State**: Animated illustrations and helpful tips
- **Quick Navigation**: Easy access to Trending and Generate pages
- **Pro Tips Section**: Contextual guidance for using saved posts
- **Animated Elements**: Floating bookmark animations

### ⚙️ Settings & Preferences
- **Two-Tab Interface**: My Info and Preferences
- **Profile Management**: Upload photo, edit personal details
- **LinkedIn Integration**: Connect your LinkedIn profile
- **Timezone Selection**: 8+ timezone options
- **Job Descriptions**: Multi-select professional roles
- **Default Tone**: Set your preferred voice tone
- **Post Length**: Choose from Short, Medium, or Long
- **Content Preferences**: Toggle emojis and hashtags
- **AI Fine-tuning**: Custom instructions for AI generation

## 🎨 Design System

### Color Palette
- **Primary**: `#FF6B81` (Coral Pink)
- **Primary Dark**: `#FF5570`
- **Primary Light**: `#FF8FA3`
- **Background**: `#F9FAFB` (Gray 50)
- **Cards**: `#FFFFFF` (White)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Design Tokens
- **Border Radius**: 16px (cards), 12px (buttons/inputs)
- **Shadows**:
  - Card: `0 2px 8px rgba(0, 0, 0, 0.06)`
  - Card Hover: `0 4px 16px rgba(0, 0, 0, 0.1)`
- **Transitions**: 200ms ease for all interactions

## 🛠️ Tech Stack

- **Framework**: React 18.2 with TypeScript
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 3.3
- **Animations**: Framer Motion 10.16
- **Icons**: Lucide React 0.294
- **Routing**: React Router DOM 6.20
- **Notifications**: React Hot Toast 2.4
- **Date Handling**: date-fns 2.30

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Git

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/easygen-saas.git
   cd easygen-saas
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🏗️ Project Structure

```
easygen/
├── public/
│   └── vite.svg                 # Favicon
├── src/
│   ├── components/
│   │   ├── Layout.tsx           # Main layout wrapper
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   ├── TopBar.tsx           # Top navigation bar
│   │   └── ToneModal.tsx        # Voice tone selection modal
│   ├── pages/
│   │   ├── Dashboard.tsx        # Generate Post page
│   │   ├── MyPosts.tsx          # Post management page
│   │   ├── Trending.tsx         # Trending posts discovery
│   │   ├── Saved.tsx            # Saved posts library
│   │   ├── Calendar.tsx         # Content calendar
│   │   └── Settings.tsx         # Settings and preferences
│   ├── App.tsx                  # App router and routes
│   ├── main.tsx                 # App entry point
│   └── index.css                # Global styles and Tailwind
├── .eslintrc.cjs                # ESLint configuration
├── .gitignore                   # Git ignore rules
├── index.html                   # HTML entry point
├── package.json                 # Dependencies and scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind customization
├── tsconfig.json                # TypeScript configuration
├── tsconfig.node.json           # TypeScript node config
└── vite.config.ts               # Vite configuration
```

## 🚀 Build & Deploy

### Production Build
```bash
npm run build
# or
yarn build
```

The build output will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
# or
yarn preview
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop the dist/ folder to Netlify
```

## 🎯 Key Features Implementation

### Modular Components
All components are designed to be:
- **Reusable**: Can be imported and used across different pages
- **Type-Safe**: Full TypeScript support with proper interfaces
- **Accessible**: Keyboard navigation and ARIA labels
- **Responsive**: Mobile-first design with adaptive layouts

### Backend Integration Ready
The app is structured for easy API integration:
- State management ready for Redux/Zustand
- API service layer can be added in `src/services/`
- Mock data can be replaced with real API calls
- Authentication hooks ready for implementation

### Dark Mode Ready
The design system supports dark mode:
- Color tokens use Tailwind's dark: variants
- Components use semantic color classes
- Easy toggle implementation in Settings

## 🔌 Integration Points

### n8n Workflow Integration
Ready for n8n automation:
- Webhook endpoints for post generation
- Scheduled post triggers
- LinkedIn API integration points
- Analytics data collection

### API Endpoints (To Implement)
```typescript
POST   /api/posts/generate      // Generate AI content
GET    /api/posts               // List all posts
POST   /api/posts               // Create new post
PUT    /api/posts/:id           // Update post
DELETE /api/posts/:id           // Delete post
GET    /api/trending            // Get trending posts
POST   /api/schedule            // Schedule post
GET    /api/user/settings       // Get user settings
PUT    /api/user/settings       // Update settings
```

## 🎨 Customization

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#YOUR_COLOR',
  'primary-dark': '#YOUR_DARK_COLOR',
  'primary-light': '#YOUR_LIGHT_COLOR',
}
```

### Add New Voice Tones
Edit `src/components/ToneModal.tsx` and add to the `tones` array:
```typescript
{
  name: 'Your Tone',
  emoji: '🎯',
  description: 'Your description',
  color: 'from-color-500/10 to-color-600/10',
  borderColor: 'border-color-200',
}
```

### Modify Sidebar Navigation
Edit `src/components/Sidebar.tsx` and update the `navigation` array.

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components are fully responsive and adapt to different screen sizes.

## 🧪 Testing (Future)

```bash
# Add testing libraries
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Run tests
npm run test
```

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💬 Support

For questions or issues:
- Create an issue on GitHub
- Email: support@easygen.app

## 🎉 Acknowledgments

- Design inspired by Notion, Figma, and modern SaaS platforms
- Icons by Lucide React
- Fonts by Google Fonts (Inter)

---

**Built with ❤️ for content creators**
