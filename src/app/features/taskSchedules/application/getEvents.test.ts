import { aEventBuilder } from '../domain/builders/aEventBuilder';
import { repository } from '../domain/repository';
import { getEvents } from './getEvents';

jest.mock('../domain/repository');

describe('getEvents', () => {
  it('should return the events', async () => {
    jest.spyOn(repository, 'getEvents').mockResolvedValue([aEventBuilder()]);

    const events = await getEvents();

    expect(events).toEqual([aEventBuilder()]);
  });
});
