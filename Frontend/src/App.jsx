import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import PasswordContextProvider from "./store/PasswordContext";
import UserContextProvider from "./store/UserContext.jsx";




function App() {
  return (
    <>
      <UserContextProvider>
        <PasswordContextProvider>
          <div className="min-h-screen bg-green-50 flex flex-col justify-between">
            <Navbar />
            <div className="min-h-[80vh]">
              <HeroSection />
            </div>
            <Footer />
              
          </div>
        </PasswordContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
