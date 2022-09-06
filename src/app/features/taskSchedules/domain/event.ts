import { Talk } from './talks';

export interface Event {
  id: string;
  name: string;
  date: Date;
  description: string;
  talks: Talk[];
}
