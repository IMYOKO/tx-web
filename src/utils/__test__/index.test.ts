import { isPhone, isPassword, isTradePassword, isIDCard, isBankCard } from '../index';

describe('utils function test', () => {
  it('isPhone test', () => {
    expect(isPhone('13424567890')).toBeTruthy();
    expect(isPhone('134245678902')).toBeFalsy();
    expect(isPhone('1342456789')).toBeFalsy();
  });
  it('isPassword test', () => {
    expect(isPassword('123456')).toBeTruthy();
    expect(isPassword('12s4A6')).toBeTruthy();
    expect(isPassword('b2s4A6')).toBeTruthy();
    expect(isPassword('12345')).toBeFalsy();
    expect(isPassword('12345我')).toBeFalsy();
    expect(isPassword('123456789012345678')).toBeTruthy();
    expect('123456789012345678'.length).toBe(18);
    expect(isPassword('1234567890123456789')).toBeFalsy();
    expect(isPassword('123456_')).toBeTruthy();
    expect(isPassword('1_23456')).toBeTruthy();
    expect(isPassword('_123456')).toBeFalsy();
    expect(isPassword('@123456')).toBeFalsy();
    expect(isPassword('12@123456')).toBeFalsy();
  });
  it('isTradePassword test', () => {
    expect(isTradePassword('123456')).toBeTruthy();
    expect(isTradePassword('1234567')).toBeFalsy();
    expect(isTradePassword('123E5r')).toBeFalsy();
    expect(isTradePassword('12345')).toBeFalsy();
    expect(isTradePassword('12345_')).toBeFalsy();
    expect(isTradePassword('12$&5!')).toBeFalsy();
  });
  it('isIDCard test', () => {
    expect(isIDCard('362123198701233456')).toBeTruthy();
    expect('362123198701233456'.length).toBe(18);
    expect(isIDCard('36212319870123346')).toBeFalsy();
  });
  it('isBankCard test', () => {
    expect(isBankCard('6217765422223566382')).toBeTruthy();
    expect('6217765422223566382'.length).toBe(19);
  });
});
