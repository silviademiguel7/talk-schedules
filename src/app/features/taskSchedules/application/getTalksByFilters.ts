import { Event } from '../domain/event';
import { repository } from '../domain/repository';
import { Talk } from '../domain/talks';

export interface Filter {
  name: 'speaker' | 'topic';
  value: Talk['speaker'] | Talk['topic'];
}

export const getTalksByFilters = async (
  eventId: Event['id'],
  filters: Filter[]
) => {
  const talks = await repository.getTalks(eventId);
  let filteredTalks = talks;
  filters.forEach((filter) => {
    if (filter.name === 'speaker') {
      filteredTalks = filteredTalks.filter(
        (talk) => talk[filter.name] === filter.value
      );
    }
    if (filter.name === 'topic') {
      filteredTalks = filteredTalks.filter(
        (talk) => talk[filter.name] === filter.value
      );
    }
  });

  return filteredTalks;
};
