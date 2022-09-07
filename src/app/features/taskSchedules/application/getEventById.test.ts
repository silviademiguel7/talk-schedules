import { getEventById } from './getEventById';
import { repository } from '../domain/repository';
import { aEventBuilder, withId } from '../domain/aEventBuilder';
import { eventFilterService } from '../domain/eventFilterService';

jest.mock('../domain/repository');
jest.mock('../domain/eventFilterService');

describe('getEventById', () => {
  it('should be return an event with an specific id', async () => {
    const events = [aEventBuilder(withId('1'))];
    jest.spyOn(repository, 'getEvents').mockResolvedValue(events);
    jest
      .spyOn(eventFilterService, 'filter')
      .mockReturnValue(aEventBuilder(withId('1')));

    const filteredEvent = await getEventById('1');

    expect(eventFilterService.filter).toHaveBeenCalledWith(events, '1');
    expect(filteredEvent).toEqual(aEventBuilder(withId('1')));
  });
});
