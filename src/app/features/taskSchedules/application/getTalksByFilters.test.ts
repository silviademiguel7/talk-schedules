import { aTalkBuilder, withSpeaker, withTopic } from '../domain/aTalkBuilder';
import { repository } from '../domain/repository';
import { getTalksByFilters } from './getTalksByFilters';

jest.mock('../domain/repository');

describe('getTalksByFilters', () => {
  it('should return talks filtered by speaker', async () => {
    const talks = [aTalkBuilder(withSpeaker('speaker1')), aTalkBuilder()];
    jest.spyOn(repository, 'getTalks').mockResolvedValue(talks);

    const filteredTalks = await getTalksByFilters('eventId', [
      { name: 'speaker', value: 'speaker1' },
    ]);

    expect(filteredTalks).toEqual([aTalkBuilder(withSpeaker('speaker1'))]);
  });

  it('should return talks filtered by topic', async () => {
    const talks = [aTalkBuilder(withTopic('topic1')), aTalkBuilder()];
    jest.spyOn(repository, 'getTalks').mockResolvedValue(talks);

    const filteredTalks = await getTalksByFilters('eventId', [
      { name: 'topic', value: 'topic1' },
    ]);

    expect(filteredTalks).toEqual([aTalkBuilder(withTopic('topic1'))]);
  });

  it('should return talks filtered by topic and speaker', async () => {
    const talks = [
      aTalkBuilder(withTopic('topic1'), withSpeaker('speaker1')),
      aTalkBuilder(withTopic('topic1')),
    ];
    jest.spyOn(repository, 'getTalks').mockResolvedValue(talks);

    const filteredTalks = await getTalksByFilters('eventId', [
      { name: 'speaker', value: 'speaker1' },
      { name: 'topic', value: 'topic1' },
    ]);

    expect(filteredTalks).toEqual([
      aTalkBuilder(withTopic('topic1'), withSpeaker('speaker1')),
    ]);
  });
});
