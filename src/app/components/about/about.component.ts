import { Component } from '@angular/core';
import { MenuComponent } from '../../common/components/menu.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css','../../common/css/bootstrap.min.css']
})
export class AboutComponent {

}
