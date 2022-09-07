import { Event } from './event';

const getEventById = (events: Event[], id: Event['id']) => {
  const event = events.find((e) => e.id === id);

  if (!event) {
    throw new Error('Event not found');
  }
  return event;
};

export const eventFilterService = {
  filter: getEventById,
};
