
import Header from "./components/Header";
import Hero from "./components/Hero";
import MainContent from "./components/MainContent";
import Membership from "./components/Membership";
import ClassSchedule from "./components/ClassSchedule";
import Footer from "./components/Footer";


export default function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <MainContent />
        <ClassSchedule />
        <Membership />
      </main>

      <Footer />
    </>
  );
}

