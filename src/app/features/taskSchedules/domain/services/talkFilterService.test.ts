import { aTalkBuilder, withSpeaker, withTopic } from '../builders/aTalkBuilder';
import { talkFilterService } from './talkFilterService';

describe('talkFilterService', () => {
  it('should return talks filtered by speaker', () => {
    const talks = [aTalkBuilder(withSpeaker('speaker1')), aTalkBuilder()];

    const filteredTalks = talkFilterService.filter(
      [{ name: 'speaker', value: 'speaker1' }],
      talks
    );

    expect(filteredTalks).toEqual([aTalkBuilder(withSpeaker('speaker1'))]);
  });

  it('should return talks filtered by topic', () => {
    const talks = [aTalkBuilder(withTopic('topic1')), aTalkBuilder()];

    const filteredTalks = talkFilterService.filter(
      [{ name: 'topic', value: 'topic1' }],
      talks
    );

    expect(filteredTalks).toEqual([aTalkBuilder(withTopic('topic1'))]);
  });

  it('should return talks filtered by topic and speaker', () => {
    const talks = [
      aTalkBuilder(withTopic('topic1'), withSpeaker('speaker1')),
      aTalkBuilder(withTopic('topic1')),
    ];

    const filteredTalks = talkFilterService.filter(
      [
        { name: 'speaker', value: 'speaker1' },
        { name: 'topic', value: 'topic1' },
      ],
      talks
    );

    expect(filteredTalks).toEqual([
      aTalkBuilder(withTopic('topic1'), withSpeaker('speaker1')),
    ]);
  });
});
