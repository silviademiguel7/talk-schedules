import { Event } from '../domain/event';
import { Talk } from '../domain/talks';
import { repository } from './repository';

export const getTalkBySpeaker = (
  eventId: Event['id'],
  speaker: Talk['speaker']
): Promise<Talk[]> => {
  return Promise.resolve(
    repository.getTalks(eventId).filter((talk) => talk.speaker === speaker)
  );
};
