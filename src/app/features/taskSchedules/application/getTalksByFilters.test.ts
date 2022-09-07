import {
  aTalkBuilder,
  withSpeaker,
  withTopic,
} from '../domain/builders/aTalkBuilder';
import { repository } from '../domain/repository';
import { talkFilterService } from '../domain/services/talkFilterService';
import { getTalksByFilters } from './getTalksByFilters';

jest.mock('../domain/repository');
jest.mock('../domain/services/talkFilterService');

describe('getTalksByFilters', () => {
  it('should return filtered', async () => {
    const talks = [
      aTalkBuilder(withTopic('topic1'), withSpeaker('speaker1')),
      aTalkBuilder(withTopic('topic1')),
    ];
    jest.spyOn(repository, 'getTalks').mockResolvedValue(talks);
    jest.spyOn(talkFilterService, 'filter').mockReturnValue([talks[0]]);

    const filteredTalks = await getTalksByFilters('eventId', [
      { name: 'speaker', value: 'speaker1' },
    ]);

    expect(talkFilterService.filter).toHaveBeenCalledWith(
      [{ name: 'speaker', value: 'speaker1' }],
      talks
    );
    expect(filteredTalks).toEqual([talks[0]]);
  });
});
