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
import Geolocation from 'react-native-geolocation-service';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
      position: {
        coords: {
          latitude: -6.6205026,
          longitude: 106.8185424,
        },
      },
    };
  }

  componentDidMount() {
    // Geolocation.getCurrentPosition(
    //   position => {
    //     console.log(position);
    //     this.setState({position});
    //   },
    //   error => {
    //     // See error code charts below.
    //     console.log(error.code, error.message);
    //   },
    //   {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    // );

    this.watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;

        const newCoordinate = {
          latitude,
          longitude,
        };
        // console.log(newCoordinate);
        // this.setState({position});
        if (Platform.OS === 'android') {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              1500,
            ); // 500 is the duration to animate the marker
          }
        }
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        FastestInterval: 500,
      },
    );
  }
  componentWillUnmount() {
    Geolocation.clearWatch(this.watchId);
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
            latitude: this.state.position.coords.latitude,
            longitude: this.state.position.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={{...StyleSheet.absoluteFillObject}}>
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={{
              latitude: this.state.position.coords.latitude,
              longitude: this.state.position.coords.longitude,
              latitudeDelta: 0,
              longitudeDelta: 0,
            }}
          />
        </MapView>
      </View>
    );
  }
}
