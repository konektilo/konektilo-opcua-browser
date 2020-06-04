import {Component} from '@angular/core';

interface Server {
  value: string;
  viewValue: string;
}

interface Namespace {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  categories = ['fanspeed', '1', '2', 'speed', 'more'];

  items = ['matrix', 'My Devices', 'Server', 'Data'];

  servers: Server[] = [
    {value: 'opcauatestserver', viewValue: 'Testserver'},
    {value: 'michisserver', viewValue: 'MS Server'},
    {value: 'romansserver', viewValue: 'Apple Server'}
  ];
  namespaces: Namespace[] = [
    {value: 'namespace1', viewValue: '1'},
    {value: 'namespace2', viewValue: '2'},
    {value: 'namespace3', viewValue: '3'}
  ];

  constructor() {
  }

  onCategoryChange(category) {

  };

}
