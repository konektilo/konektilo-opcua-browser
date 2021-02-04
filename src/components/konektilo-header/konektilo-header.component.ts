import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-konektilo-header',
  templateUrl: './konektilo-header.component.html',
  styleUrls: ['./konektilo-header.component.scss'],
})
export class KonektiloHeaderComponent implements OnInit {
  @Input() title = '';

  constructor() {
  }

  ngOnInit() {
  }

}
