import { Helmet } from 'react-helmet-async';
import { PageTitles } from '../../shared/const';
import React from 'react';
import { Purchases } from '../../components/purchases/purchases';

const PurchasesPage = () => {
  return (
    <>
      <Helmet>
        <title>{PageTitles.Purchases}</title>
      </Helmet>
      <Purchases />
    </>
  );
};

export default PurchasesPage;
