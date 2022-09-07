import { Event } from '../domain/event';
import { eventFilterService } from '../domain/eventFilterService';
import { repository } from '../domain/repository';

export const getEventById = async (eventId: Event['id']): Promise<Event> => {
  const events = await repository.getEvents();
  return eventFilterService.filter(events, eventId);
};
