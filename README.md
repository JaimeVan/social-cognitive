# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

## Project Structure
```bash
app/
├── app.css
├── components
│   ├── charts                              # 图表数据版块，添加自己的实现
│   │   ├── ImageDisplay.tsx
│   │   ├── NetworkGraph.tsx
│   │   ├── PieChartView.tsx
│   │   ├── TimeSeriesChart.tsx
│   │   └── WordCloudSlider.tsx
│   └── ui                                  # shadcn/ui 框架引入，禁止添加文件
│       ├── button.tsx
│       ├── card.tsx
│       ├── select.tsx
│       ├── sheet.tsx
│       └── tabs.tsx
├── data
│   └── sample.json
├── lib
│   └── utils.ts
├── root.tsx
├── routes                                  # 大版块，添加自己的实现
│   ├── analysis.tsx
│   ├── home.tsx
│   ├── input.tsx
│   ├── layouts
│   │   └── AppLayout.tsx
│   └── loading.tsx
├── routes.ts
├── sections
│   ├── GroupsSection.tsx
│   ├── OverviewSection.tsx
│   └── PropagationSection.tsx
└── welcome
    ├── logo-dark.svg
    ├── logo-light.svg
    └── welcome.tsx
public                                      # 一些资源图片文件
├── favicon.ico
└── images
    ├── keywords_top.png
    ├── network_1.png
    ├── wordcloud_1.png
    ├── wordcloud_2.png
    └── wordcloud_3.png
```
---

Built with ❤️ using React Router.
