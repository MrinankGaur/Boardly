# Boardly - Collaborative Whiteboard Application

Boardly is a real-time collaborative whiteboard application that allows users to create, share, and collaborate on digital whiteboards in real-time.

🌐 **Live Demo:** [boardly24.vercel.app](https://boardly24.vercel.app)

## 🚀 Features

- Real-time collaboration
- Multi-user support
- Interactive whiteboard tools
- Responsive design
- Google authentication
- Custom room creation
- Real-time cursor tracking

## 💻 Tech Stack

- **Frontend**
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - shadcn/ui
  - Geist Font

- **Backend**
  - Convex (Real-time Database)
  - Clerk (Authentication)

- **Deployment**
  - Vercel (Frontend)

## 🛠️ Installation

1. Clone the repository
```bash
git clone https://github.com/MrinankGaur/boardly.git
cd boardly
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create a .env.local file and add:
CONVEX_DEPLOYMENT=your_convex_deployment_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔑 Environment Variables

Make sure to set up the following environment variables:

- `CONVEX_DEPLOYMENT`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Mrinank Gaur - [@MrinankGaur](https://github.com/MrinankGaur)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Convex](https://www.convex.dev/)
- [Clerk](https://clerk.com/)
- [shadcn/ui](https://ui.shadcn.com/)
