import { Event } from '../domain/event';
import { repository } from '../domain/repository';
import { eventFilterService } from '../domain/services/eventFilterService';

export const getEventById = async (eventId: Event['id']): Promise<Event> => {
  const events = await repository.getEvents();
  return eventFilterService.filter(events, eventId);
};
