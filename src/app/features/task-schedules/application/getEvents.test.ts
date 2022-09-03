import { aEventBuilder } from '../domain/aEventBuilder';
import { repository } from './repository';
import { getEvents } from './getEvents';

jest.mock('./repository');

describe('getEvents', () => {
  it('should return the events', async () => {
    jest.spyOn(repository, 'getEvents').mockResolvedValue([aEventBuilder()]);

    const events = await getEvents();

    expect(events).toEqual([aEventBuilder()]);
  });
});
