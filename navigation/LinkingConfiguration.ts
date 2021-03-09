import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              CategoryList: 'home',
            },
          },
          TabTwo: {
            screens: {
              CategoryList: 'categoryList',
              ItemList: 'itemList',
              ItemDetails: 'itemDetails',
            },
          },
          TabThree: {
            screens: {
              CategoryList: 'categoryList',
            },
          },
          TabFour: {
            screens: {
              CategoryList: 'categoryList',
            },
          },
          TabFive: {
            screens: {
              CategoryList: 'myAccount',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
