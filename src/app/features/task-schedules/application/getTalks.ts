import { Event } from '../domain/event';
import { Talk } from '../domain/talks';
import { repository } from './repository';

export const getTalks = (eventId: Event['id']): Promise<Talk[]> => {
  return repository.getTalks(eventId);
};
