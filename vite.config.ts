import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const repository = process.env.GITHUB_REPOSITORY ?? ''
const [owner, repositoryName] = repository.split('/')
const isGitHubUserSite = repositoryName === `${owner}.github.io`

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Project Pages use /repository/; a username.github.io site is served at root.
  base: process.env.GITHUB_ACTIONS
    ? (isGitHubUserSite ? '/' : `/${repositoryName}/`)
    : '/',
})
