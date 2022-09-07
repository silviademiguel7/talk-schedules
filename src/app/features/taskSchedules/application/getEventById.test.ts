import { getEventById } from './getEventById';
import { repository } from '../domain/repository';
import { aEventBuilder, withId } from '../domain/builders/aEventBuilder';
import { eventFilterService } from '../domain/services/eventFilterService';

jest.mock('../domain/repository');
jest.mock('../domain/services/eventFilterService');

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
