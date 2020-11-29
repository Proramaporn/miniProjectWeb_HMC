import React, { Component } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import Constants from 'expo-constants';
import firestore from './firebase/Firestore';
import * as Animatable from 'react-native-animatable';

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons'; 


import { connect } from 'react-redux';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodData: null,
      foodName: null,
      foodList: [],
    };
    firestore.getAllFood(this.getSuccess, this.reject);
  }

  getSuccess = (querySnapshot) => {
    let docRef;
    let foodList = [];
    querySnapshot.forEach(function (doc) {
      docRef = doc.data();
      docRef.id = doc.id;
      foodList = foodList.concat(docRef);
      console.log(foodList);
    });
    this.setState({ foodList: foodList });
    console.log(this.state.foodList);
  };

  reject = (error) => {
    console.log(error);
  };

  onSearch = () => {
    if (this.state.foodName === null || this.state.foodName === '')
      firestore.getAllFood(this.getSuccess, this.reject);
    else firestore.getFood(this.state.foodName, this.getSuccess, this.reject);
    this.setState({ foodName: null });
  };

  onAdd = () => {
    this.props.navigation.navigate("NewFood")
  };

  renderFooter = () => {
    return (
      <View style={styles.footer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Entypo name="facebook-with-circle" size={30} color="white" />
          <Text style={styles.textFooter}>HowManyCalories</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Entypo name="instagram-with-circle" size={30} color="white" />
          <Text style={styles.textFooter}>HowManyCalories</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Entypo name="mail-with-circle" size={30} color="white" />
          <Text style={styles.textFooter}>howmanycalories@gmail.com</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Entypo name="pinterest-with-circle" size={30} color="white" />
          <Text style={styles.textFooter}>HowManyCalories</Text>
        </View>
      </View>
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#dddddd',
        }}
      />
    );
  };

  renderItem = ({ item }) => {
    return (
      <Animatable.View
        animation="fadeInUp"
        delay={500}
        style={{
          flex: 1,
          margin:20,
          width:500,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fffffff0',
          borderRadius: 50,
          alignSelf:'center'
        }}>
        <View>
          <Image style={styles.image} source={{ uri: item.foodUri }} />
        </View>
        <View
          style={{
            marginTop: '2%',
            borderTopWidth: 2,
            borderTopColor: 'black',
            width: '80%',
            padding: '3%',
          }}>
          <Text
            style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 25 }}>
            {item.foodName}
          </Text>
          <Text
            style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>
            {item.foodCal} kcal.
          </Text>
        </View>
      </Animatable.View>
    );
  };

  render(props) {
    return (
      <ImageBackground
        style={{
          flex: 1,
          paddingTop: Constants.statusBarHeight,
          backgroundColor:'black'
        }}
        >
        <Animatable.View style={{height:1000, backgroundColor:'black', marginBottom: 20}}  animation="fadeInUp">
          <Image style={{resizeMode: 'cover', height: 1000}} source={{uri: 'https://uppic.cc/d/8BvABm6PNqDwnXSVuHQbw'}} />
        </Animatable.View>
        <View style={styles.header}>
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              height: 90,
              width: '20%',
              alignItems: 'center',
              borderRadius: 50,
              paddingLeft: '5%',
            }}>
            <TouchableOpacity onPress={this.onAdd}>
              <Text style={styles.textInput}>ADD NEW FOOD</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              height: 90,
              width: '50%',
              alignItems: 'center',
              borderRadius: 50,
              paddingLeft: '5%',
            }}>
            <TextInput
              placeholderTextColor="black"
              placeholder="SEARCH (FOOD)"
              style={styles.textInput}
              value={this.state.foodName}
              onChangeText={(text) => this.setState({ foodName: text })}
            />
            <TouchableOpacity onPress={this.onSearch}>
              <FontAwesome name="search" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width:'70%',alignSelf:'center'}}>
          <FlatList
            data={this.state.foodList}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
        <this.renderFooter/>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  middle: {
    paddingLeft: 16,
    paddingRight: 16,
    marginLeft: 16,
    marginRight: 16,
    alignItems:'center',
  },
  contact: {
    flex: 1,
  },
  textInput: {
    height: '80%',
    fontSize: 25,
    fontWeight: 'bold',
    width: '80%',
    marginLeft: '2%',
    marginRight: '2%',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    height: '70%',
    margin: 8,
  },
  image: {
    width: 500,
    height: 270,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  header: {
    alignItems: 'center',
    height:100,
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
    justifyContent: 'center',
    alignItems:'flex-end',
    marginRight:'2%',
    flexDirection: 'row'
  },
  footer:{
    backgroundColor:'black',
    borderColor: 'white',
    borderTopWidth: 2,
    alignItems: 'center',
    padding: 10,
  },
  textFooter: {
    fontSize: 18,
    color: 'white',
    padding: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    carList: state.carReducer.carList,
  };
};

export default connect(mapStateToProps)(Menu);
