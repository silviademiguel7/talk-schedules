import { aTalkBuilder } from '../domain/builders/aTalkBuilder';
import { repository } from '../domain/repository';
import { getTalks } from './getTalks';

jest.mock('../domain/repository');

describe('getTalks', () => {
  it('should return the talks of an event', async () => {
    jest.spyOn(repository, 'getTalks').mockResolvedValue([aTalkBuilder()]);

    const talks = await getTalks('irrelevantId');

    expect(talks).toEqual([aTalkBuilder()]);
  });
});
