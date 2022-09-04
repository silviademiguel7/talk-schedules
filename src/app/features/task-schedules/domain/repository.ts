import { Event } from './event';
import { Talk } from './talks';

export interface Repository {
  getEvents: () => Promise<Event[]>;
  getTalks: (eventId: string) => Promise<Talk[]>;
}

const repositoryByDefault: Repository = {
  getEvents: () => {
    throw new Error('Not implemented');
  },
  getTalks: () => {
    throw new Error('Not implemented');
  },
};

export const repository = {
  init: (repositoryToLoad: Repository) => {
    Object.assign(repositoryByDefault, repositoryToLoad);
  },
  getEvents: () => {
    return repositoryByDefault.getEvents();
  },
  getTalks: (eventId: string) => repositoryByDefault.getTalks(eventId),
};
