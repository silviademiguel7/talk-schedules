import { aTalkBuilder, withSpeaker } from '../domain/aTalkBuilder';
import { repository } from '../domain/repository';
import { getTalksBySpeaker } from './getTalksBySpeaker';

jest.mock('../domain/repository');

describe('getTalksBySpeaker', () => {
  it('should return the talk of an event given by a teacher ', async () => {
    jest
      .spyOn(repository, 'getTalks')
      .mockResolvedValue([
        aTalkBuilder(),
        aTalkBuilder(withSpeaker('speaker')),
      ]);

    const talks = await getTalksBySpeaker('irrelevantEvent', 'speaker');

    expect(talks).toEqual([aTalkBuilder(withSpeaker('speaker'))]);
  });
});
