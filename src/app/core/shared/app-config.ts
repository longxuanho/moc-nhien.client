export const timeConfig = {
  defaultDateFormat: 'YYYY-MM-DD',
  defaultDateHourFormat: 'YYYY-MM-DD HH:mm',
}

export const dbHelper = {
  gSheet: {
    productMenuMaster: "https://script.google.com/macros/s/AKfycbzUstOklUmuXrgvQAoETCDst3sDfE3d6Re22iXM9LWzTkPPHFQ/exec?id=1dGGG7U7CS5IoymxUDUmOuiQ9s3KuuEqNLik6tHYU1lA",
    productHerbMenuRef: "https://script.google.com/macros/s/AKfycbzUstOklUmuXrgvQAoETCDst3sDfE3d6Re22iXM9LWzTkPPHFQ/exec?id=1dGGG7U7CS5IoymxUDUmOuiQ9s3KuuEqNLik6tHYU1lA&sheet=herbMenu",
    producFlowerMenuRef: "https://script.google.com/macros/s/AKfycbzUstOklUmuXrgvQAoETCDst3sDfE3d6Re22iXM9LWzTkPPHFQ/exec?id=1dGGG7U7CS5IoymxUDUmOuiQ9s3KuuEqNLik6tHYU1lA&sheet=flowerMenu",
    productFruitTreeMenuRef: "https://script.google.com/macros/s/AKfycbzUstOklUmuXrgvQAoETCDst3sDfE3d6Re22iXM9LWzTkPPHFQ/exec?id=1dGGG7U7CS5IoymxUDUmOuiQ9s3KuuEqNLik6tHYU1lA&sheet=fruitTreeMenu",
    productOramentalPlantMenuRef: "https://script.google.com/macros/s/AKfycbzUstOklUmuXrgvQAoETCDst3sDfE3d6Re22iXM9LWzTkPPHFQ/exec?id=1dGGG7U7CS5IoymxUDUmOuiQ9s3KuuEqNLik6tHYU1lA&sheet=ornamentalPlantMenu",
  }
}

export const dbConfigProd = {
  firebase: {
    apiKey: "AIzaSyD_oHEfC6OQxmHqM3V5i6vsOSpynCXQRHA",
    authDomain: "sk-moc-nhien-farm.firebaseapp.com",
    databaseURL: "https://sk-moc-nhien-farm.firebaseio.com",
    storageBucket: "sk-moc-nhien-farm.appspot.com",
    messagingSenderId: "6568024806"
  },
  fbApp: 'sk-moc-nhien-farm',
  fbRefUsers: 'prod/accounts/users',
  fbRefManagers: 'prod/accounts/managers',
  fbRefBlogs: 'prod/blogs',
  fbRefBlogBodies: 'prod/blogBodies',
  fbRefProducts: 'prod/products',
  fbRefProductArticles: 'prod/productArticles',
  fbRefProductGallery: 'prod/productGallery',
  fbRefAbout: 'prod/about',
  esRefProducts: 'https://rowan-661671.us-east-1.bonsaisearch.net/prod-firebase/products/_search',
  esRefBlogs: 'https://rowan-661671.us-east-1.bonsaisearch.net/prod-firebase/blogs/_search',
  esUsername: '601a62i2',
  esPassword: 'ncrntq76wes44er9'
}

export const dbConfigDev = {
  fbApp: 'sk-moc-nhien-farm',
  fbRefUsers: 'prod/accounts/users',
  fbRefManagers: 'prod/accounts/managers',
  fbRefBlogs: 'prod/blogs',
  fbRefBlogBodies: 'prod/blogBodies',
  fbRefProducts: 'prod/products',
  fbRefProductArticles: 'prod/productArticles',
  fbRefProductGallery: 'prod/productGallery',
  fbRefAbout: 'prod/about',
  esRefProducts: 'https://rowan-661671.us-east-1.bonsaisearch.net/dev-firebase/products/_search',
  esRefBlogs: 'https://rowan-661671.us-east-1.bonsaisearch.net/dev-firebase/blogs/_search',
  esUsername: '601a62i2',
  esPassword: 'ncrntq76wes44er9'
}

export const appConfig = {
  dev: {
    apis: {

    }
  }

}