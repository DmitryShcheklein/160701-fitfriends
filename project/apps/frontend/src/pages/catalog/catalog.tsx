import { Helmet } from 'react-helmet-async';
import { PageTitles } from '../../shared/const';
import { Sidebar } from '../../components/sidebar/sidebar';
import { CatalogSidebar } from '../../components/catalog-sidebar/catalog-sidebar';

export const CatalogPage = () => {
  return (
    <>
      <Helmet>
        <title>{PageTitles.Catalog}</title>
      </Helmet>

      <Sidebar>
        <CatalogSidebar />
      </Sidebar>
    </>
  );
};

export default CatalogPage;
