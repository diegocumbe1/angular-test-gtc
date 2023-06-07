import { Component } from '@angular/core';
import { DocenteService } from './docente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gtc-test-angular';

  constructor(docents: DocenteService){
    console.log(docents.getDocentes());


  }
}
