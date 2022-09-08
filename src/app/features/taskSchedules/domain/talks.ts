export interface Talk {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  room: string;
  speaker: string;
  topic: string;
}

export const talksRooms = (talks: Talk[]): Talk['room'][] => {
  const rooms = getUniqueValues(talks.map((talk) => talk.room));
  return rooms;
};

export const talksSpeakers = (talks: Talk[]): Talk['speaker'][] => {
  const speakers = getUniqueValues(talks.map((talk) => talk.speaker));
  return speakers;
};

export const talksTopics = (talks: Talk[]): Talk['topic'][] => {
  const topics = getUniqueValues(talks.map((talk) => talk.topic));
  return topics;
};

export const talksByRoom = (room: Talk['room'], talks: Talk[]): Talk[] => {
  const talksByRoom = talks.filter((talk) => talk.room === room);
  return talksByRoom;
};

const getUniqueValues = (array: string[]) => {
  const uniqueArray = array.filter((value, i, ar) => ar.indexOf(value) === i);
  return uniqueArray;
};
