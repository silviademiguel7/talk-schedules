import { Event } from '../domain/event';
import { Talk } from '../domain/talks';
import { repository } from '../domain/repository';

export const getTalksBySpeaker = async (
  eventId: Event['id'],
  speaker: Talk['speaker']
): Promise<Talk[]> => {
  return (await repository.getTalks(eventId)).filter(
    (talk) => talk.speaker === speaker
  );
};
