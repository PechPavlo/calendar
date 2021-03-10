import sum from '../services/sum';

test('My first test', () => {
    expect(sum(1, 10)).toBe(11);
});

describe('sum', () => {
  const one = 1;
  const ten = 10;
  it('should return', () => {
    const result = sum(one, ten);
    expect(result).toBe(11);
  });
});

test('async test', async () => {
    const asyncMock = jest.fn().mockResolvedValue(43);
  
    await asyncMock(); // 43
  });
