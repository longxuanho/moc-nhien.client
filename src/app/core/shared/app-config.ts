export const appConfig = {
  dev: {
    apis: {
      san_phams: "http://localhost:8080/api/san_phams",
      don_hangs: "http://localhost:8080/api/don_hangs",
    },
    helpers: {
      san_phams_menu: "https://script.google.com/macros/s/AKfycbzUstOklUmuXrgvQAoETCDst3sDfE3d6Re22iXM9LWzTkPPHFQ/exec?id=1dGGG7U7CS5IoymxUDUmOuiQ9s3KuuEqNLik6tHYU1lA&sheet=menu",
      locations: "https://script.google.com/macros/s/AKfycbzUstOklUmuXrgvQAoETCDst3sDfE3d6Re22iXM9LWzTkPPHFQ/exec?id=1dGGG7U7CS5IoymxUDUmOuiQ9s3KuuEqNLik6tHYU1lA&sheet=locations"
    }
  },
  prod: {
    apis: {
      san_phams: "https://moc-nhien-api.azurewebsites.net/api/san_phams",
      don_hangs: "https://moc-nhien-api.azurewebsites.net/api/don_hangs"
    },
    helpers: {
      san_phams_menu: "https://script.google.com/macros/s/AKfycbzUstOklUmuXrgvQAoETCDst3sDfE3d6Re22iXM9LWzTkPPHFQ/exec?id=1dGGG7U7CS5IoymxUDUmOuiQ9s3KuuEqNLik6tHYU1lA&sheet=menu",
      locations: "https://script.google.com/macros/s/AKfycbzUstOklUmuXrgvQAoETCDst3sDfE3d6Re22iXM9LWzTkPPHFQ/exec?id=1dGGG7U7CS5IoymxUDUmOuiQ9s3KuuEqNLik6tHYU1lA&sheet=locations"
    }
  }

}