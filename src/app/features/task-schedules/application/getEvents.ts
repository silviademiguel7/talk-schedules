import { Event } from '../domain/event';
import { repository } from '../domain/repository';

export const getEvents = (): Promise<Event[]> => {
  return repository.getEvents();
};
