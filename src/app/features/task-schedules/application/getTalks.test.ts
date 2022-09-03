import { aTalkBuilder } from '../domain/aTalkBuilder';
import { getTalks } from './getTalks';
import { repository } from './repository';

jest.mock('./repository');

describe('getTalks', () => {
  it('should return the talks of an event', async () => {
    jest.spyOn(repository, 'getTalks').mockResolvedValue([aTalkBuilder()]);

    const talks = await getTalks('irrelevantId');

    expect(talks).toEqual([aTalkBuilder()]);
  });
});
