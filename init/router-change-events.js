import Router from 'next/router';
import RouterEvents from '~/lib/router-events';

let counter = 0;

RouterEvents.on('routeChangeStart', url => {});

RouterEvents.on('routeChangeComplete', url => {
  //console.log(Router.query.id, counter++)
  // TODO: update details by id
});

RouterEvents.on('routeChangeError', url => {});

RouterEvents.on('hashChangeStart', url => {});

RouterEvents.on('hashChangeComplete', url => {});
