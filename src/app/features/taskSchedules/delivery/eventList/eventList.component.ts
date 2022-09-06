import { Component, OnInit } from '@angular/core';
import { getEvents } from '../../application/getEvents';
import { Event } from '../../domain/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './eventList.component.html',
  styleUrls: ['./eventList.component.css'],
})
export class EventListComponent implements OnInit {
  public events: Event[] = [];
  constructor() {}

  ngOnInit(): void {
    this.onLoad();
  }

  async onLoad() {
    this.events = await getEvents();
  }

  getMonth(date: Date) {
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'July',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    return monthNames[date.getMonth()];
  }
}
