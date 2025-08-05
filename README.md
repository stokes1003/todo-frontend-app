# Todo Frontend

Modern, responsive Todo List application built with Next.js 15, TypeScript, and Tailwind CSS. Features a beautiful dark theme with comprehensive CRUD operations and real-time database integration.

## 🚀 Features

- ✨ **Modern UI/UX**: Dark theme with custom color palette
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🎨 **Custom Styling**: Beautiful gradients and animations
- ✅ **Full CRUD Operations**: Create, read, update, delete tasks
- 🎯 **Color Coding**: Assign colors to tasks for better organization
- 🔄 **Real-time Updates**: Instant UI updates with API integration
- 🚀 **Fast Performance**: Built with Next.js 15 and optimized for speed
- 🗄️ **Database Integration**: Connected to Prisma Cloud PostgreSQL database

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API with useReducer
- **HTTP Client**: Fetch API with custom service layer
- **Icons**: SVG icons for crisp, scalable design
- **Font**: Inter (Google Fonts)
- **Backend**: Express.js API with Prisma Cloud

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see [Backend Repository](https://github.com/yourusername/todo-api-backend))

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/todo-frontend.git
cd todo-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🗂️ Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── TaskCard.tsx    # Individual task display
│   ├── TaskForm.tsx    # Create/edit task form
│   └── Header.tsx      # App header with logo
├── context/            # React Context for state management
│   └── TaskContext.tsx # Global task state and operations
├── services/           # API service layer
│   └── api.ts         # HTTP client and API methods
├── types/              # TypeScript type definitions
│   └── task.ts        # Task interface and related types
├── create/             # Create task page
│   └── page.tsx
├── edit/               # Edit task page
│   └── [id]/
│       └── page.tsx
├── globals.css         # Global styles and Tailwind imports
├── layout.tsx          # Root layout component
└── page.tsx            # Home page with task list
public/                 # Static assets
├── favicon.ico
└── *.svg              # SVG icons
```

## 🎨 Design Features

### Color Palette

- **Background**: `#1A1A1A` (Dark theme)
- **Header Background**: `#0D0D0D`
- **Primary Blue**: `#1E6F9F` (Logo "Todo")
- **Secondary Purple**: `#8284FA` (Logo "App")
- **Button Gradient**: `#1E6F9F` to `#2B8FD1`
- **Task Colors**: 8 predefined colors for task organization

### Typography

- **Font Family**: Inter (Google Fonts)
- **Logo**: Large, bold text with custom colors
- **Body Text**: Clean, readable white text on dark background

### Layout

- **Container Width**: 736px (centered)
- **Spacing**: Consistent 80px gaps between major sections
- **Responsive**: Adapts to different screen sizes

## 📱 Usage

### Creating Tasks

1. Click the "Create Task" button on the home page
2. Enter a task title (minimum 3 characters)
3. Select a color from the color palette
4. Click "Add Task" to save

### Editing Tasks

1. Click on any task card to open the edit form
2. Modify the title or change the color
3. Click "Save" to update the task

### Managing Tasks

- **Toggle Completion**: Click the circular checkbox to mark tasks as complete/incomplete
- **Delete Tasks**: Click the trash icon and confirm deletion
- **View Summary**: See total tasks and completion count at the top

## 🛠️ Development Scripts

| Script               | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start development server with hot reload |
| `npm run build`      | Build for production                     |
| `npm run start`      | Start production server                  |
| `npm run lint`       | Run ESLint                               |
| `npm run type-check` | Run TypeScript type checking             |

## 🔧 Configuration

### Environment Variables

| Variable              | Description     | Default                   |
| --------------------- | --------------- | ------------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API URL | http://localhost:3001/api |

### API Integration

The frontend communicates with the backend through the API service layer:

```typescript
// Example API call
const tasks = await apiService.getTasks();
const newTask = await apiService.createTask({
  title: "New Task",
  color: "blue",
});
```

## 🎯 Key Components

### TaskCard

- Displays individual task with completion status
- Handles toggle and delete operations
- Responsive design with hover effects

### TaskForm

- Reusable form for creating and editing tasks
- Form validation with error messages
- Color selection with visual feedback

### TaskContext

- Global state management using React Context
- API integration with error handling
- Optimistic updates for better UX

## 🔒 Error Handling

- **Form Validation**: Client-side validation with user-friendly messages
- **API Errors**: Graceful error handling with try-catch blocks
- **Loading States**: Visual feedback during API operations
- **Network Errors**: Fallback UI for connection issues

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Responsive design for tablet and desktop
- **Touch Friendly**: Large touch targets for mobile interaction
- **Flexible Layout**: Adapts to different screen sizes

## 🚀 Performance Optimizations

- **Next.js 15**: Latest features for optimal performance
- **Code Splitting**: Automatic code splitting by pages
- **Image Optimization**: Optimized SVG icons
- **Bundle Analysis**: Built-in bundle analyzer

## 🧪 Testing

### Manual Testing

1. **Create a task**: Navigate to create page and submit a new task
2. **Edit a task**: Click on a task card and modify its content
3. **Toggle completion**: Click the checkbox to mark as complete
4. **Delete a task**: Click the trash icon and confirm deletion

### Type Checking

```bash
npm run type-check
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Set `NEXT_PUBLIC_API_URL` to your backend URL
3. **Deploy**: Vercel will automatically build and deploy

### Other Platforms

1. **Build the application**:

```bash
npm run build
```

2. **Set environment variables**:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

3. **Start the server**:

```bash
npm start
```

## 🔗 API Integration

The frontend expects the following API endpoints from the backend:

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion

## 🗄️ Database Integration

This frontend connects to a backend API that uses:

- **Database**: PostgreSQL (hosted on Prisma Cloud)
- **ORM**: Prisma with Accelerate for connection pooling
- **Real-time**: Changes are immediately reflected in the database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Backend Repository](https://github.com/yourusername/todo-api-backend)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Prisma Cloud Documentation](https://www.prisma.io/docs/cloud)
