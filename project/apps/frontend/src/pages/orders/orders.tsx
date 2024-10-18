import { Helmet } from 'react-helmet-async';
import { PageTitles } from '../../shared/const';
import React from 'react';
import { LoaderPage } from '../../components/loaders/loader-page/loader-page';
import { useGetOrdersQuery } from '../../store/orders-process/orders-api';
import { Orders } from '../../components/orders/orders';

const OrdersPage = () => {
  const { data, isLoading } = useGetOrdersQuery();
  console.log(data);

  return (
    <>
      <Helmet>
        <title>{PageTitles.Orders}</title>
      </Helmet>
      {isLoading ? <LoaderPage /> : <Orders />}
    </>
  );
};

export default OrdersPage;
