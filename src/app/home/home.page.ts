import { Component, OnInit, signal, effect} from '@angular/core';
import { Motion } from '@capacitor/motion';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  accel: any = signal({
    x: 0,
    y: 0,
    z: 0
  });



  val: any = signal(1);

  async getAccel() {
    const thisacc = await Motion.addListener(
      'accel',
      (e) => {
        this.accel.set(e.accelerationIncludingGravity);
      }
    
      )

  }

  ngOnInit (): void{
    this.getAccel();

  }

  constructor() {
    effect(() => {
      if (this.accel().x >10 || this.accel().y >10 || this.accel().z >10) {
        this.val.set(Math.floor(Math.random() * 6) + 1);
      }

    },
    {
      allowSignalWrites: true
    });

  }
}