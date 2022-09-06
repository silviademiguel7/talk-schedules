import { Talk } from './talks';

export const aTalkBuilder = (...options: Partial<Talk>[]) => {
  const talkDefault: Talk = {
    id: 'irrelevantId',
    title: 'irrelevantTitle',
    speaker: 'irrelevantSpeaker',
    startDate: new Date('2000-01-01 12:00:00'),
    endDate: new Date('2000-01-01 13:00:00'),
    room: 'irrelevantRoom',
    topic: 'irrelevantTopic',
  };

  return Object.assign({}, talkDefault, ...options);
};

export function withId(id: Talk['id']) {
  return { id };
}

export function withTitle(title: Talk['title']) {
  return { title };
}

export function withSpeaker(speaker: Talk['speaker']) {
  return { speaker };
}

export function withStartDate(startDate: Talk['startDate']) {
  return { startDate };
}

export function withEndDate(endDate: Talk['endDate']) {
  return { endDate };
}

export function withroom(room: Talk['room']) {
  return { room };
}

export function withTopic(topic: Talk['topic']) {
  return { topic };
}
