import { Event } from '../domain/event';
import { Repository } from '../domain/repository';
import { Talk } from '../domain/talks';

export const talksSchedulesMemoryRepository: Repository = {
  getTalks,
  getEvents,
};

interface TalkDTO {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  room: string;
  speaker: string;
  topic: string;
}

interface EventDTO {
  id: string;
  name: string;
  date: string;
  description: string;
  talks: TalkDTO[];
}

const event1Talks: TalkDTO[] = [
  {
    id: '1',
    title: 'Introduction',
    startDate: '2022/11/14 09:30:00',
    endDate: '2022/11/14 09:45:00',
    room: 'Sala 1',
    speaker: 'David Fernandez Garcia',
    topic: 'General',
  },
  {
    id: '2',
    title: 'Pasate a Micronaut',
    startDate: '2022/11/14 10:00:00',
    endDate: '2022/11/14 11:00:00',
    room: 'Sala 1',
    speaker: 'Miguel Angel Perez Muñoz',
    topic: 'Backend',
  },
  {
    id: '3',
    title: 'La revolucion de GraalVM',
    startDate: '2022/11/14 11:00:00',
    endDate: '2022/11/14 12:00:00',
    room: 'Sala 1',
    speaker: 'Lucas Élices Alonso',
    topic: 'DevOps',
  },

  {
    id: '4',
    title: 'Vue VS el restio de escoria',
    startDate: '2022/11/14 09:30:00',
    endDate: '2022/11/14 10:30:00',
    room: 'Sala 2',
    speaker: 'Iñaki Heras Torrosa',
    topic: 'Frontend',
  },
  {
    id: '5',
    title: 'Brujería con TypeScript',
    startDate: '2022/11/14 11:00:00',
    endDate: '2022/11/14 11:30:00',
    room: 'Sala 2',
    speaker: 'Mario Feranandez Tapia',
    topic: 'Frontend',
  },
  {
    id: '6',
    title: 'Kubernetes para Dummies',
    startDate: '2022/11/14 11:30:00',
    endDate: '2022/11/14 11:45:00',
    room: 'Sala 2',
    speaker: 'Lucia Castro de la Torre',
    topic: 'DevOps',
  },
];

const event2Talks: TalkDTO[] = [
  {
    id: '7',
    title: 'Introduction',
    startDate: '2022/11/15 9:00:00',
    endDate: '2022/11/15 10:00:00',
    room: 'Sala 1',
    speaker: 'David Fernandez Garcia',
    topic: 'General',
  },
  {
    id: '8',
    title: 'Pasate a Micronaut',
    startDate: '2022/11/15 10:00:00',
    endDate: '2022/11/15 11:00:00',
    room: 'Sala 1',
    speaker: 'Miguel Angel Perez Muñoz',
    topic: 'Backend',
  },
  {
    id: '9',
    title: 'La revolucion de GraalVM',
    startDate: '2022/11/15 11:00:00',
    endDate: '2022/11/15 12:00:00',
    room: 'Sala 1',
    speaker: 'Lucas Élices Alonso',
    topic: 'DevOps',
  },

  {
    id: '10',
    title: 'Vue VS el restio de escoria',
    startDate: '2022/11/15 10:00:00',
    endDate: '2022/11/15 11:00:00',
    room: 'Sala 2',
    speaker: 'Iñaki Heras Torrosa',
    topic: 'Frontend',
  },
  {
    id: '11',
    title: 'Brujería con TypeScript',
    startDate: '2022/11/15 11:00:00',
    endDate: '2022/11/15 12:00:00',
    room: 'Sala 2',
    speaker: 'Mario Feranandez Tapia',
    topic: 'Frontend',
  },
  {
    id: '12',
    title: 'Kubernetes para Dummies',
    startDate: '2022/11/15 12:00:00',
    endDate: '2022/11/15 13:00:00',
    room: 'Sala 2',
    speaker: 'Lucia Castro de la Torre',
    topic: 'DevOps',
  },
];

const events: EventDTO[] = [
  {
    id: 'event1',
    name: 'Pamplona Software Crafters',
    date: '2022/11/14',
    description:
      'El encuentro sobre desarrollo de software para aquellas personas que buscan compartir sus experiencias y mejorar [sus habilidades] como profesionales',
    talks: event1Talks,
  },
  {
    id: 'event2',
    name: 'WecodeFest',
    date: '2022/11/15',
    description:
      '¿Quieres un evento lleno de código, katas, talleres, charlas de patrones, arquitectura, tecnología...?',
    talks: event2Talks,
  },
];

const buildTalk = (talk: TalkDTO): Talk => {
  return {
    id: talk.id,
    title: talk.title,
    startDate: new Date(talk.startDate),
    endDate: new Date(talk.endDate),
    room: talk.room,
    speaker: talk.speaker,
    topic: talk.topic,
  };
};

function buildEvent(event: EventDTO): Event {
  return {
    id: event.id,
    name: event.name,
    date: new Date(event.date),
    description: event.description,
    talks: event.talks.map(buildTalk),
  };
}

async function getTalks(eventId: Event['id']): Promise<Talk[]> {
  const event = (await getEvents()).find((event) => event.id === eventId);
  if (!event) {
    throw new Error('Event not found');
  }
  return Promise.resolve(event.talks);
}

function getEvents(): Promise<Event[]> {
  return Promise.resolve(events.map(buildEvent));
}
