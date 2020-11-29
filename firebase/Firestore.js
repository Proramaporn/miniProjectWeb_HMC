import { firebase } from '@firebase/app';
import '@firebase/firestore'

class Firestore {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyAu-L8L4m1z3YAuUqbY-zMIN2rCzmPhAmc',
        authDomain: 'miniproject-468b7.firebaseapp.com',
        databaseURL: 'https://miniproject-468b7.firebaseio.com',
        projectId: 'miniproject-468b7',
        storageBucket: 'miniproject-468b7.appspot.com',
        messagingSenderId: '244095218009',
        appId: '1:244095218009:web:3e04e5344ad95fe0335c48',
        measurementId: 'G-1V7603DN4M',
      });
    } else {
      console.log('firebase apps already running....');
    }
    this.db = firebase.firestore();
  }

  addFood = (foodData, success, reject) => {
    firebase
      .firestore()
      .collection('Food')
      .add(foodData)
      .then(function (docRef) {
        success(docRef);
      })
      .catch(function (error) {
        reject(error);
      });
  };

  getAllFood = (success, reject) => {
    firebase
      .firestore()
      .collection('Food')
      .get()
      .then(function (querySnapshot) {
        success(querySnapshot);
      })
      .catch(function (error) {
        reject(error);
      });
  };

  getFood = (foodName, success, reject) => {
    firebase
      .firestore()
      .collection('Food')
      .where('foodName', '==', foodName)
      .get()
      .then(function (querySnapshot) {
        success(querySnapshot);
      })
      .catch(function (error) {
        reject(error);
      });
  };

}

const firestore = new Firestore();
export default firestore;
