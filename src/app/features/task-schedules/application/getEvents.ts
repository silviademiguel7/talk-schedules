import { Event } from '../domain/event';
import { repository } from './repository';

export const getEvents = (): Promise<Event[]> => {
  return repository.getEvents();
};
