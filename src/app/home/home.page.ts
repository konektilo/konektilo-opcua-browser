import { Component } from '@angular/core';

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
  servers: Server[] = [
    {value: 'opcauatestserver', viewValue: 'OPC-UA Testserver'},
    {value: 'michisserver', viewValue: 'Michael Test Server'},
    {value: 'romansserver', viewValue: 'Roman Test Server'}
  ];
  namespaces: Namespace[] = [
    {value: 'namespace1', viewValue: 'Namespace 1'},
    {value: 'namespace2', viewValue: 'Namespace 2'},
    {value: 'namespace3', viewValue: 'Namespace 3'}
  ];
  constructor() {}

}
