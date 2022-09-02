import { Event } from '../domain/event';
import { Talk } from '../domain/talks';
import { repository } from './repository';

export const getTalkBySpeaker = (
  eventId: Event['id'],
  topic: Talk['topic']
): Promise<Talk[]> => {
  return Promise.resolve(
    repository.getTalks(eventId).filter((talk) => talk.topic === topic)
  );
};
