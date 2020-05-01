import { Component, Input } from '@angular/core';
import { openCloseAnimation, openCloseShadeAnimation } from 'src/app/components/pop-up/animation'

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
  animations: [
    openCloseAnimation,
    openCloseShadeAnimation,
  ]
})
export class PopUpComponent {
  @Input() isOpen = false;
}
