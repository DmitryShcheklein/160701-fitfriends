import { Helmet } from 'react-helmet-async';
import { getPageTitle } from '../../shared/const';
import { MyOrders } from '../../components/my-orders/my-orders';

export const MyOrdersPage = () => {
  return (
    <>
      <Helmet>
        <title>{getPageTitle('MyOrders')}</title>
      </Helmet>
      <MyOrders />
    </>
  );
};

export default MyOrders;
