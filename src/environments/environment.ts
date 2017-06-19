// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apis: {
    san_phams: "http://localhost:8080/api/san_phams",
    don_hangs: "http://localhost:8080/api/don_hangs",
  },
  helpers: {
    san_phams_menu: "https://script.google.com/macros/s/AKfycbzUstOklUmuXrgvQAoETCDst3sDfE3d6Re22iXM9LWzTkPPHFQ/exec?id=1dGGG7U7CS5IoymxUDUmOuiQ9s3KuuEqNLik6tHYU1lA&sheet=menu",
    locations: "https://script.google.com/macros/s/AKfycbzUstOklUmuXrgvQAoETCDst3sDfE3d6Re22iXM9LWzTkPPHFQ/exec?id=1dGGG7U7CS5IoymxUDUmOuiQ9s3KuuEqNLik6tHYU1lA&sheet=locations"
  }
};
