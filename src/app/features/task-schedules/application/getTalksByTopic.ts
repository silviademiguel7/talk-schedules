import { Event } from '../domain/event';
import { Talk } from '../domain/talks';
import { repository } from '../domain/repository';

export const getTalksByTopic = async (
  eventId: Event['id'],
  topic: Talk['topic']
): Promise<Talk[]> => {
  return (await repository.getTalks(eventId)).filter(
    (talk) => talk.topic === topic
  );
};
