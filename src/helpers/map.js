import Geolocation from 'react-native-geolocation-service';

export const shareLiveLocation = ref => {
  return Geolocation.watchPosition(
    position => {
      const {latitude, longitude} = position.coords;

      const live_location = {
        isLive: true,
        latitude,
        longitude,
      };

      ref.set({live_location});
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
      // interval: 3000,
      fastestInterval: 3000,
    },
  );
};

export const stopShareLiveLocation = (watchId, ref) => {
  Geolocation.clearWatch(watchId);
  const live_location = {
    isLive: false,
    latitude: 0,
    longitude: 0,
  };

  ref.set({live_location});
  console.log('okay');
};
