import {ToastOptions} from '@ionic/core';
import {ToastController} from '@ionic/angular';

export default function displayToast(message: string) {
  const toastOptions: ToastOptions = {
    message,
    duration: 1500,
    position: 'bottom'
  };

  return new ToastController().create(toastOptions);
}
