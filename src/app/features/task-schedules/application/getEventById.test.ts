import { getEventById } from './getEventById';
import { repository } from '../domain/repository';
import { aEventBuilder, withId } from '../domain/aEventBuilder';

jest.mock('../domain/repository');

describe('getEventById', () => {
  it('should be return an event with an specific id', async () => {
    jest
      .spyOn(repository, 'getEvents')
      .mockResolvedValue([aEventBuilder(withId('1'))]);
    const event = await getEventById('1');

    expect(event).toEqual(aEventBuilder(withId('1')));
  });
});
