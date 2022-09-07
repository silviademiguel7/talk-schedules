import { aTalkBuilder, withSpeaker, withTopic } from '../domain/aTalkBuilder';
import { repository } from '../domain/repository';
import { talkFilterService } from '../domain/talkFilterService';
import { getTalksByFilters } from './getTalksByFilters';

jest.mock('../domain/repository');
jest.mock('../domain/talkFilterService');

describe('getTalksByFilters', () => {
  it('should return filtered', async () => {
    const talks = [
      aTalkBuilder(withTopic('topic1'), withSpeaker('speaker1')),
      aTalkBuilder(withTopic('topic1')),
    ];
    jest.spyOn(repository, 'getTalks').mockResolvedValue(talks);
    jest.spyOn(talkFilterService, 'filter').mockReturnValue(talks[0]);

    const filteredTalks = await getTalksByFilters('eventId', [
      { name: 'speaker', value: 'speaker1' },
    ]);

    expect(talkFilterService.filter).toHaveBeenCalledWith(
      [{ name: 'speaker', value: 'speaker1' }],
      talks
    );
    expect(filteredTalks).toEqual(talks[0]);
  });
});
