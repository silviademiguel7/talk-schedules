import { aTalkBuilder, withTopic } from '../domain/aTalkBuilder';
import { getTalksByTopic } from './getTalksByTopic';
import { repository } from './repository';

jest.mock('./repository');

describe('getTalksByTopic', () => {
  it('should return the talks of an event with a topic ', async () => {
    jest
      .spyOn(repository, 'getTalks')
      .mockResolvedValue([aTalkBuilder(), aTalkBuilder(withTopic('topic'))]);

    const talks = await getTalksByTopic('irrelevantEvent', 'topic');

    expect(talks).toEqual([aTalkBuilder(withTopic('topic'))]);
  });
});
