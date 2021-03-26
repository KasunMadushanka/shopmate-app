import React, { PureComponent } from 'react'
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { Auth } from 'aws-amplify';

export default class CategoryList extends PureComponent {
   signOut = async (): Promise<void> => {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  render() {

    return (
      <View>
      <Text>efef</Text>
          <Text style={styles.headerText}>Welcome!</Text>
          <Pressable style={styles.button} onPress={() => this.signOut()}>
            <Text style={styles.buttonText}>Sign out</Text>
          </Pressable>

      </View>
    );
  }
  
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    paddingVertical: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    width: 150,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ff9900',
    padding: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});