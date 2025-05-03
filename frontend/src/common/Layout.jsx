import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, hideHeader = false }) => (
  <div className="d-flex flex-column vh-100">
    {!hideHeader && <Header />}
    <main className="flex-grow-1 overflow-hidden d-flex flex-column">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
