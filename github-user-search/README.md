# GitHub User Search

A modern, responsive React application for searching and exploring GitHub users and their profiles. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **User Search**: Search for GitHub users by username
- **Advanced Search**: Filter users by location and minimum repository count
- **User Profiles**: View detailed user information including location, repository count, and profile links
- **Pagination**: Load more search results with pagination support
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Real-time API Integration**: Fetches data from GitHub's public API
- **Error Handling**: Graceful error handling for API failures and invalid searches

## Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 3.4.4
- **Routing**: React Router DOM 7.9.6
- **HTTP Client**: Axios 1.13.2
- **Language**: JavaScript (with TypeScript configuration)
- **Development Tools**: ESLint, PostCSS, Autoprefixer

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd github-user-search
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5174`

## Project Structure

```
github-user-search/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Search.jsx
│   │   ├── UserProfile.jsx
│   │   └── WelcomeMessage.jsx
│   ├── services/
│   │   ├── githubApi.js
│   │   └── githubService.js
│   ├── App.jsx
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── App.css
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Usage

### Basic Search
1. Navigate to the search page (`/search`)
2. Enter a GitHub username in the search field
3. Click "Search" to find the user
4. View the user's profile information and GitHub link

### Advanced Search
1. Use the location field to filter users by their location
2. Set a minimum repository count to find users with many repositories
3. Combine username, location, and repository filters for precise searches

### Navigation
- **Home (/)**: Welcome page with project description
- **Search (/search)**: User search interface
- **User Profile (/user/:username)**: Individual user profile pages

## API Integration

The application integrates with GitHub's REST API:

- **User Search**: `GET /search/users` - Search for users with query parameters
- **User Details**: `GET /users/{username}` - Fetch detailed user information

### Rate Limiting
GitHub API has rate limits for unauthenticated requests (60 requests per hour). For production use, consider implementing authentication with a personal access token.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

The project uses ESLint for code linting with React-specific rules. TypeScript configuration is available for type checking.

### Styling

Tailwind CSS is used for styling with a custom configuration. Utility classes are applied directly in JSX for rapid development.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow React best practices and hooks guidelines
- Use meaningful component and variable names
- Add comments for complex logic
- Ensure responsive design across devices
- Test API error scenarios

## Environment Variables

Create a `.env` file in the root directory for environment-specific configurations:

```
VITE_GITHUB_TOKEN=your_github_personal_access_token
```

Note: The `.env` file is included in `.gitignore` to prevent committing sensitive information.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- GitHub API for providing user data
- React team for the excellent framework
- Tailwind CSS for the utility-first CSS framework
- Vite for the fast build tool

---

Built with ❤️ using React and Vite.
