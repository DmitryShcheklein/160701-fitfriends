import { Outlet } from 'react-router-dom';
import Header from '../components/base/header/header';
import ScrollToTop from '../components/base/scroll-to-top/scroll-to-top';

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />

      <div className="wrapper">
        <Header />
        <main>
          <section className="">
            <div className="container">
              <Outlet />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default MainLayout;
