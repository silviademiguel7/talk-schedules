import { Event } from '../domain/event';
import { repository } from './repository';

export const getEvents = (): Promise<Event[]> => {
  return Promise.resolve(repository.getEvents());
};
