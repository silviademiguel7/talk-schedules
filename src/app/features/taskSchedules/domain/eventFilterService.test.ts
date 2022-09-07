import { aEventBuilder, withId } from './aEventBuilder';
import { eventFilterService } from './eventFilterService';

describe('eventFilterService', () => {
  it('should return the event filtered by id', () => {
    const events = [aEventBuilder(withId('1')), aEventBuilder(withId('2'))];

    const event = eventFilterService.filter(events, '1');

    expect(event).toEqual(aEventBuilder(withId('1')));
  });
});
