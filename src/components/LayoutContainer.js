import "./LayoutContainer.scss";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Header from "./Header";

function LayoutContainer({ children, handleSubmit, headTitle, className }) {
  return (
    <>
      <Header title={headTitle} />
      <Navbar navType="nav-dashboard" />
      <main className={`main-container ${className}`}>
        <Sidebar />
        <section className="layout-container">
          <form onSubmit={handleSubmit}>{children}</form>
        </section>
      </main>
    </>
  );
}

export default LayoutContainer;
