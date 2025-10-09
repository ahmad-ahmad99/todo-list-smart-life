# React + TypeScript + Vite

This template provides setup to get React working in Vite with HMR and some ESLint rules.

# 📝 Todo List App with Auth

A modern, drag-and-drop enabled Todo List application built with **React**, **TypeScript**, and **MUI**. Includes authentication via JWT and full task management features.

---

## 🔐 Authentication

This app uses [DummyJSON Auth API](https://dummyjson.com/docs/auth) for JWT-based authentication.

You can log in using the following credentials:
Username: emilys
Password: emilyspass


---

## ✨ Features

- ✅ **Login with JWT** (via DummyJSON)
- 🗂️ **Add, edit, and delete tasks**
- ➕ **Create new columns**
- 🔄 **Drag and drop tasks between columns** (powered by [`@dnd-kit`](https://github.com/clauderic/dnd-kit))
- ↕️ **Sortable tasks within the same column**
- 🎨 **Responsive UI** built with [MUI](https://mui.com/)
- 🧠 **Type-safe architecture** using TypeScript

---

## 🧭 Routing & Sidebar Navigation

To add a new page or route:

### 1. Define the path in `paths.ts`

```ts
export const paths = {

  newFeature: '/new-feature', 
};
```
### 2. Add the link to the sidebar in `nav-config-dashboard.tsx`

```ts
{
  title: 'New Feature',
  path: paths.newFeature,
  icon: <SvgIcon src="/assets/icons/navbar/new-feature.svg" />,
}
```

### 3. Add the page to the link in `route/sections/dashboard.tsx`


## 🚀 Tech Stack

- **React.js**
- **TypeScript**
- **MUI (Material UI)**
- **@dnd-kit** for drag-and-drop
- **DummyJSON** for mock authentication
- **axios** for API
---

## 📦 Getting Started

```bash
npm install
npm run dev

