
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Header from "./components/Header";
import Hero from "./components/Hero";
import MainContent from "./components/MainContent";
import Membership from "./components/Membership";
import ClassSchedule from "./components/ClassSchedule";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import MemberPage from "./pages/MemberPage";

function HomePage() {
  return (
    <>
      <Header />

      <main id="home">
        <Hero />
        <MainContent />
        <ClassSchedule />
        <Membership />
        <Register />
      </main>

      <Footer />
    </>
  );
}

function LoginPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-950 px-5 py-12 text-white">
        <Login />
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/member" element={<MemberPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
