import { DEVELOPMENT_ENV } from './consts';
// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn:
    process.env.NODE_ENV === DEVELOPMENT_ENV
      ? null
      : process.env.NEXT_PUBLIC_SENTRY_DSN,
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.1,
  // toggles the sentry environment tag based off the env variables from Vercel. This is to make sure that we don't confuse prod bugs with staging bugs
  environment: process.env.NEXT_PUBLIC_DEPLOY_ENV,
  denyUrls: [
    /https?:\/\/(.*)yotpo\.com/,
    /https?:\/\/(.*)appsflyer\.com/,
    /https?:\/\/(.*)smooch\.io/,
    /https?:\/\/(.*)doubleclick\.net/,
    /^chrome-extension:\/\//i,
    /^safari-extension:\/\//i
  ]
});
