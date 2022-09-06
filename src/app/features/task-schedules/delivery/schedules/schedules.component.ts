import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getEventById } from '../../application/getEventById';

import { getTalks } from '../../application/getTalks';
import { Filter, getTalksByFilters } from '../../application/getTalksByFilters';
import { Event } from '../../domain/event';
import {
  Talk,
  talksByRoom,
  talksRooms,
  talksSpeakers,
  topicsTalks,
} from '../../domain/talks';

type OptionView = 'listMode' | 'tableMode';

interface Interval {
  startDate: Date;
  endDate: Date;
}

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
  public filters: Filter[] = [];
  public activeOtpionView: OptionView = 'tableMode';
  public timeZone: Interval[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.onLoad();
  }

  createIntervalCollection(
    startHour: number,
    endHour: number,
    duration: number
  ) {
    const intervalCollection = [];
    for (let i = startHour; i <= endHour; i++) {
      intervalCollection.push(this.createTimeZone(i, duration));
    }
    return intervalCollection;
  }

  createTimeZone(hour: number, duration: number) {
    const timeZone = {
      startDate: this.createDate(hour),
      endDate: this.createDate(hour + duration),
    };

    return timeZone;
  }

  createDate(hour: number) {
    const dateCopy = new Date(this.event.date);
    dateCopy.setHours(hour);
    return dateCopy;
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
    this.timeZone = this.createIntervalCollection(9, 13, 1);
  }

  getTalksByRoom(room: Talk['room']): Talk[] {
    const talks = talksByRoom(room, this.talks);
    return talks.sort(
      (talkA, talkB) => Number(talkA.startDate) - Number(talkB.startDate)
    );
  }

  padTo2Digits = (num: number): string => String(num).padStart(2, '0');

  getHours(date: Date): string {
    return (
      this.padTo2Digits(date.getHours()) +
      ':' +
      this.padTo2Digits(date.getMinutes())
    );
  }

  getMonth(date: Date): string {
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
        (filter: Filter) => filter.name !== 'topic'
      );
      this.changeTalksByFilters();
      return;
    }
    const index = this.filters.findIndex(
      (filter: Filter) => filter.name === 'topic'
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
        (filter: Filter) => filter.name !== 'speaker'
      );
      this.changeTalksByFilters();
      return;
    }
    const index = this.filters.findIndex(
      (filter: Filter) => filter.name === 'speaker'
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

  onChangeViewOption(event: any) {
    const option = event.target.id;
    this.activeOtpionView = option;
  }

  isOptionViewActive(option: OptionView): boolean {
    return this.activeOtpionView === option;
  }

  getTalk(zone: Interval, room: Talk['room']) {
    return (
      this.talks
        .filter((talk) => {
          return this.isTalkInInterval(zone, talk) && talk.room === room;
        })
        .sort(
          (talkA, talkB) => Number(talkA.startDate) - Number(talkB.startDate)
        ) || { title: '', speaker: '', topic: '' }
    );
  }

  isTalkInInterval(zone: Interval, talk: Talk) {
    const { startDate, endDate } = talk;

    return (
      Number(endDate) > Number(zone.startDate) &&
      Number(startDate) < Number(zone.endDate)
    );
  }

  getDurationTalkInSlotInPercentage(zone: Interval, talk: Talk) {
    const { startDate, endDate } = talk;

    if (this.getIntervalTalkFromSlotComparison(zone, talk) === 'mayor') {
      if (Number(startDate) === Number(zone.startDate)) {
        return 100;
      }
      if (Number(startDate) < Number(zone.startDate)) {
        if (endDate >= zone.endDate) {
          return 100;
        }
        return this.getIntervalInHour(zone.startDate, endDate) * 100;
      }

      if (Number(startDate) > Number(zone.startDate)) {
        return this.getIntervalInHour(startDate, zone.endDate) * 100;
      }
    }

    if (this.getIntervalTalkFromSlotComparison(zone, talk) === 'igual') {
      if (Number(startDate) === Number(zone.startDate)) {
        return 100;
      }
      if (Number(startDate) < Number(zone.startDate)) {
        return this.getIntervalInHour(zone.startDate, endDate) * 100;
      }
      if (Number(startDate) > Number(zone.startDate)) {
        return this.getIntervalInHour(startDate, zone.endDate) * 100;
      }
    }

    if (this.getIntervalTalkFromSlotComparison(zone, talk) === 'menor') {
      return this.getIntervalInHour(startDate, endDate) * 100;
    }
    throw new Error('case not covered');
  }

  getTopTranslationInPercentage(zone: Interval, talk: Talk) {
    const { startDate } = talk;
    const durationSlot = this.getIntervalInHour(zone.startDate, zone.endDate);

    if (startDate.getTime() === zone.startDate.getTime()) {
      return 0;
    }
    if (startDate.getTime() > zone.startDate.getTime()) {
      const durationTalkInSlotInHour = this.getDurationTalkInSlotInHour(
        zone,
        talk
      );
      return (durationSlot - durationTalkInSlotInHour) * 100;
    }
    return 0;
  }

  getDurationTalkInSlotInHour = (zone: Interval, talk: Talk) => {
    const { startDate } = talk;
    const durationTalkInSlot = this.getIntervalInHour(startDate, zone.endDate);
    return durationTalkInSlot;
  };

  getIntervalTalkFromSlotComparison = (zone: Interval, talk: Talk) => {
    const { startDate, endDate } = talk;
    const intervalSlot = this.getIntervalInHour(zone.startDate, zone.endDate);
    const intervalTalk = this.getIntervalInHour(startDate, endDate);
    if (intervalTalk > intervalSlot) {
      return 'mayor';
    }
    if (intervalTalk < intervalSlot) {
      return 'menor';
    }
    return 'igual';
  };

  getIntervalInHour = (dateStart: Date, dateEnd: Date) => {
    const interval = this.milisecondsToHour(
      dateEnd.getTime() - dateStart.getTime()
    );
    return interval;
  };

  milisecondsToHour = (value: number): number => {
    return value / 1000 / 60 / 60;
  };
}
