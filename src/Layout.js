import Footer from './components/Footer/Footer';
import Navigation from './components/Navigation/Navigation';
import style from './Layout.module.css'

function Layout({ children }) {

    return (
        <div>
            <div className={style.root}>
                <Navigation />
                <main className={style.main}>{children}</main>
                <Footer />
            </div>
        </div>
    );
}

export default Layout;