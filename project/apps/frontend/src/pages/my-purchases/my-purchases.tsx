import { Helmet } from 'react-helmet-async';
import { getPageTitle } from '../../shared/const';
import React from 'react';
import { Purchases } from '../../components/purchases/purchases';

const PurchasesPage = () => {
  return (
    <>
      <Helmet>
        <title>{getPageTitle('MyPurchases')}</title>
      </Helmet>
      <Purchases />
    </>
  );
};

export default PurchasesPage;
