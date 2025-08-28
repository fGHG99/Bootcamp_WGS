import Navbar from './navbar';

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <Navbar />
            <main className="content-container">
                {children}
            </main>
        </div>
    );
};

export default Layout;