import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getEventById } from '../../application/getEventById';

import { getTalks } from '../../application/getTalks';
import { getTalksByFilters } from '../../application/getTalksByFilters';
import { Event } from '../../domain/event';
import {
  Talk,
  talksByRoom,
  talksRooms,
  talksSpeakers,
  topicsTalks,
} from '../../domain/talks';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css'],
})
export class SchedulesComponent implements OnInit {
  public talks: Talk[] = [];
  public event: Event = {} as Event;
  public rooms: Talk['room'][] = [];
  public speakers: Talk['speaker'][] = [];
  public topics: Talk['topic'][] = [];
  public filters: any = [];

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.onLoad();
  }

  async onLoad() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.talks = await getTalks(id);
    this.event = await getEventById(id);
    this.rooms = talksRooms(this.talks);
    this.speakers = talksSpeakers(this.talks);
    this.topics = topicsTalks(this.talks);
  }

  public getTalksByRoom(room: Talk['room']): Talk[] {
    const talks = talksByRoom(room, this.talks);
    return talks.sort(
      (talkA, talkB) => Number(talkA.startDate) - Number(talkB.startDate)
    );
  }

  public getHours(date: Date): string {
    const padTo2Digits = (num: number) => String(num).padStart(2, '0');

    return (
      padTo2Digits(date.getHours()) + ':' + padTo2Digits(date.getMinutes())
    );
  }

  public getMonth(date: Date): string {
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

  async onChangeTopic(event: any): Promise<void> {
    const option = event.target;
    if (option.value === 'todos') {
      this.filters = this.filters.filter(
        (filter: any) => filter.name !== 'topic'
      );
      this.changeTalksByFilters();
      return;
    }
    const index = this.filters.findIndex(
      (filter: any) => filter.name === 'topic'
    );
    if (index === -1) {
      this.filters.push({ name: 'topic', value: option.value });
    } else {
      this.filters[index].value = option.value;
    }

    this.changeTalksByFilters();
  }

  async onChangeSpeaker(event: any): Promise<void> {
    const option = event.target;
    if (option.value === 'todos') {
      this.filters = this.filters.filter(
        (filter: any) => filter.name !== 'speaker'
      );
      this.changeTalksByFilters();
      return;
    }
    const index = this.filters.findIndex(
      (filter: any) => filter.name === 'speaker'
    );
    if (index === -1) {
      this.filters.push({ name: 'speaker', value: option.value });
    } else {
      this.filters[index].value = option.value;
    }
    this.changeTalksByFilters();
  }

  async changeTalksByFilters() {
    if (this.filters.length === 0) {
      this.talks = await getTalks(this.event.id);
      this.rooms = talksRooms(this.talks);
      return;
    }
    this.talks = await getTalksByFilters(this.event.id, this.filters);
    this.rooms = talksRooms(this.talks);
  }

  async resetFilter() {
    this.talks = await getTalks(this.event.id);
    this.rooms = talksRooms(this.talks);
  }
}
