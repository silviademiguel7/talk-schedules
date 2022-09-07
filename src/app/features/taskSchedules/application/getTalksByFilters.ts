import { Event } from '../domain/event';
import { repository } from '../domain/repository';
import { Filter, talkFilterService } from '../domain/talkFilterService';

export const getTalksByFilters = async (
  eventId: Event['id'],
  filters: Filter[]
) => {
  const talks = await repository.getTalks(eventId);
  return talkFilterService.filter(filters, talks);
};
