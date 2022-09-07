import { Event } from './event';

export const aEventBuilder = (...options: Partial<Event>[]): Event => {
  const eventDefault: Event = {
    id: 'irrelevantId',
    name: 'irrelevantName',
    date: new Date('2000-01-01'),
    description: 'irrelevantDescription',
    talks: [],
  };

  return Object.assign({}, eventDefault, ...options);
};

export function withId(id: Event['id']) {
  return { id };
}

export function withName(name: Event['name']) {
  return { name };
}

export function withDate(date: Event['date']) {
  return { date };
}

export function withDescription(description: Event['description']) {
  return { description };
}

export function withTalks(talks: Event['talks']) {
  return { talks };
}
