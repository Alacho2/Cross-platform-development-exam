import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {RoomCardComponent} from './room-card/room-card.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [RoomCardComponent],
  exports: [RoomCardComponent],
})

export class ComponentsModule {}
