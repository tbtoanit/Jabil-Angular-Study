import { Component } from '@angular/core';
import { MenuComponent } from '../../common/components/menu.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css','../../common/css/bootstrap.min.css']
})
export class ContactComponent {

}
