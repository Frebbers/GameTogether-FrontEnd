import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <div className="d-flex flex-column vh-100">
    <Header />
    <main className="flex-grow-1 overflow-hidden d-flex flex-column">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
