import { Talk } from '../talks';

export interface Filter {
  name: 'speaker' | 'topic';
  value: Talk['speaker'] | Talk['topic'];
}

const getTalksFiltered = (filters: Filter[], talks: Talk[]) => {
  let filteredTalks = talks;
  filters.forEach((filter) => {
    filteredTalks = filteredTalks.filter(
      (talk) => talk[filter.name] === filter.value
    );
  });

  return filteredTalks;
};

export const talkFilterService = {
  filter: getTalksFiltered,
};
