import * as NextImage from 'next/image';

// Storybook doesn't recognize the `next/image` image optimization. So we turn it off just for storybook.
const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />
});


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

// The above fix, on its own, needs this addition to account for a breaking update:
NextImage.defaultProps = {
  unoptimized: true,
};
