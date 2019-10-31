import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  name: string;
  shipFrom: string;
  shipTo: string;
  tier: string;

  constructor() { }

  ngOnInit() {
  }

  processForm() {
    const allInfo = `My name is ${this.name}. I'm shipping from ${this.shipFrom}. I'm shipping to ${this.shipTo}. My tier is ${this.tier}.`;
    alert(allInfo);
  }

  selectChangeHandlerFrom (event: any) {
    this.shipFrom = event.target.value;
  }

  selectChangeHandlerTo (event: any) {
    this.shipTo = event.target.value;
  }
}
