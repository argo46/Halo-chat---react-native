import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Dimensions,
  SafeAreaView,
  Alert,
  Text,
} from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';

let unsubscribe = '';

export default class MapViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: -0.789275,
      longitude: 113.921327,
      latitudeInit: -0.789275,
      longitudeInit: 113.921327,
      isInit: false,
      isLive: true,
    };
  }

  componentDidMount() {
    const ref = this.props.navigation.getParam('ref', '');
    ref.onSnapshot(querySnapshot => {
      console.log(querySnapshot);
      // console.log('Total users', querySnapshot.size);
      // console.log('User Documents', querySnapshot);
      if (!this.state.isInit) {
        this.setState({
          latitudeInit: querySnapshot._data.live_location.latitude,
          longitudeInit: querySnapshot._data.live_location.longitude,
          latitude: querySnapshot._data.live_location.latitude,
          longitude: querySnapshot._data.live_location.longitude,
          isLive: querySnapshot._data.live_location.isLive,
          isInit: true,
        });
      } else {
        if (Platform.OS === 'android') {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              {
                latitude: querySnapshot._data.live_location.latitude,
                longitude: querySnapshot._data.live_location.longitude,
              },
              1500,
            );
          }
        }
        this.setState({
          latitude: querySnapshot._data.live_location.latitude,
          longitude: querySnapshot._data.live_location.longitude,
          isLive: querySnapshot._data.live_location.isLive,
          isInit: false,
        });
      }
      this.unsubscribe = unsubscribe;
    });
  }
  render() {
    return (
      <View style={{...StyleSheet.absoluteFillObject}}>
        <Text>HAHAHAH</Text>
        <MapView
          showUserLocation
          followUserLocation
          loadingEnabled
          region={{
            latitude: this.state.latitudeInit,
            longitude: this.state.longitudeInit,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={{...StyleSheet.absoluteFillObject}}>
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={{
              latitude: this.state.latitudeInit,
              longitude: this.state.longitudeInit,
              latitudeDelta: 0,
              longitudeDelta: 0,
            }}
          />
        </MapView>
      </View>
    );
  }
}
