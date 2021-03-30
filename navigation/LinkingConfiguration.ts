import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              ProductCapturing: 'productCapturing',
              ProductList: 'productList',
              ProductDetails: 'productDetails'
            },
          },
          TabTwo: {
            screens: {
             
            },
          },
          TabThree: {
            screens: {
              
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
