import { Event } from '../domain/event';
import { Talk } from '../domain/talks';
import { repository } from '../domain/repository';

export const getEventById = async (eventId: Event['id']): Promise<Event> => {
  return (await repository.getEvents()).filter(
    (event) => event.id === eventId
  )[0];
};
