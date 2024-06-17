import compose from 'compose-function';
import withHelmet from './with-helmet';
import withRouter from './with-router';
import withStore from './with-store';

const withProviders = compose(withStore, withRouter, withHelmet);

export default withProviders;
