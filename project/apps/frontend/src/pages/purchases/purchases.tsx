import { Helmet } from 'react-helmet-async';
import { PageTitles } from '../../shared/const';
import React from 'react';
import { LoaderPage } from '../../components/loaders/loader-page/loader-page';
import { useGetOrdersQuery } from '../../store/orders-process/orders-api';
import { Purchases } from '../../components/purchases/purchases';

const PurchasesPage = () => {
  const { data, isLoading } = useGetOrdersQuery();

  return (
    <>
      <Helmet>
        <title>{PageTitles.Purchases}</title>
      </Helmet>
      {isLoading ? <LoaderPage /> : <Purchases data={data} />}
    </>
  );
};

export default PurchasesPage;
