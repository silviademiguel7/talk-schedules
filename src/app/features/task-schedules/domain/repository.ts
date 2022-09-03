import { Event } from './event';
import { Talk } from './talks';

export interface Repository {
  getEvents: () => Promise<Event[]>;
  getTalks: (eventId: string) => Promise<Talk[]>;
  getTalksBySpeaker?: (eventId: string, speaker: string) => Promise<Talk[]>;
  getTalkByTopic?: (eventId: string, topic: string) => Promise<Talk[]>;
}

const repositoryByDefault: Repository = {
  getEvents: () => {
    throw new Error('Not implemented');
  },
  getTalks: () => {
    throw new Error('Not implemented');
  },
  getTalkByTopic: () => {
    throw new Error('Not implemented');
  },
  getTalksBySpeaker: () => {
    throw new Error('Not implemented');
  },
};

export const repository = {
  init: (repository: Repository) =>
    Object.assign(repositoryByDefault, repository),
  getEvents: repositoryByDefault.getEvents,
  getTalks: repositoryByDefault.getTalks,
  getTalksBySpeaker: repositoryByDefault.getTalksBySpeaker,
  getTalkByTopic: repositoryByDefault.getTalkByTopic,
};
