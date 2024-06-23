import compose from 'compose-function';
import withHelmet from './with-helmet';
import withRouter from './with-router';
import withStore from './with-store';
import withToastify from './with-toastify';

const withProviders = compose(withStore, withRouter, withHelmet, withToastify);

export default withProviders;
