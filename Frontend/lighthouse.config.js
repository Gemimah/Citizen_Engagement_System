module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['accessibility'],
    audits: [
      { path: 'aria-allowed-attr' },
      { path: 'aria-required-attr' },
      { path: 'color-contrast' },
      { path: 'image-alt' },
      { path: 'label' },
    ],
  },
};