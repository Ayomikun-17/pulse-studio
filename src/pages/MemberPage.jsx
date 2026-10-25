
import Header from "../components/Header";
import Footer from "../components/Footer";
import MemberProfile from "../components/MemberProfile";
import ProtectedRoute from "../components/ProtectedRoute";

export default function MemberPage() {
  return (
    <ProtectedRoute>
      <>
        <Header />

        <main className="min-h-screen bg-slate-50 py-8">
          <MemberProfile />
        </main>

        <Footer />
      </>
    </ProtectedRoute>
  );
}
