import {ToastOptions} from '@ionic/core';
import { ToastController } from '@ionic/angular';
import {Geoposition} from '@ionic-native/geolocation/ngx';
import DistanceMatrixResponse = google.maps.DistanceMatrixResponse;
import TravelMode = google.maps.TravelMode;

export function displayToast(message: string) {
  const toastOptions: ToastOptions = {
    message,
    duration: 1500,
    position: 'bottom'
  };

  return new ToastController().create(toastOptions);
}

export function stripEmailFromLandlord(email: string): string {
  const indexOfAt = email.indexOf("@");
  email = email.substring(0, indexOfAt);
  return email;
}

/**
 * Calculate the distance to the room based on the users location
 * @param postion - Users location
 * @param latitude - Rooms latitude
 * @param longitude - Rooms longitude
 */
export function getUsersDistanceToRoom(position: Geoposition, latitude: number, longitude: number): Promise<DistanceMatrixResponse> {
  return new Promise((resolve) => {
    const destination = new google.maps.LatLng(latitude, longitude);
    const origin = new google.maps.LatLng(position.coords.latitude,
      position.coords.longitude);

    const matrixService = new google.maps.DistanceMatrixService();
    matrixService.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: TravelMode.WALKING
      }, resolve);
  });
}
