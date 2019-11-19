import {ToastOptions} from '@ionic/core';
import { ToastController } from '@ionic/angular';

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
