import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { formatDate, formatMonth, parseDate, parseMonth } from '../src/lib/date-input.ts';

describe('parseDate', () => {
  it('parses D.M.YYYY and DD.MM.YYYY', () => {
    assert.equal(parseDate('1.2.2026'), '2026-02-01');
    assert.equal(parseDate(' 24.12.2026 '), '2026-12-24');
  });

  it('returns an empty string for a cleared field', () => {
    assert.equal(parseDate(''), '');
    assert.equal(parseDate('   '), '');
  });

  it('rejects invalid input and impossible dates', () => {
    assert.equal(parseDate('2026-02-01'), null);
    assert.equal(parseDate('31.02.2026'), null);
    assert.equal(parseDate('0.1.2026'), null);
    assert.equal(parseDate('1.13.2026'), null);
  });

  it('compares minDate by day, ignoring the time of day', () => {
    const minDate = new Date(2026, 10, 10, 15, 30);
    assert.equal(parseDate('10.11.2026', minDate), '2026-11-10');
    assert.equal(parseDate('09.11.2026', minDate), null);
  });
});

describe('formatDate', () => {
  it('formats ISO dates and ignores anything else', () => {
    assert.equal(formatDate('2026-02-01'), '01.02.2026');
    assert.equal(formatDate(''), '');
    assert.equal(formatDate('2026-02'), '');
  });
});

describe('parseMonth', () => {
  it('parses MM.YYYY and month names', () => {
    assert.equal(parseMonth('3.2026'), '2026-03');
    assert.equal(parseMonth('mär 2026'), '2026-03');
    assert.equal(parseMonth('Dez 2026'), '2026-12');
  });

  it('returns an empty string for a cleared field', () => {
    assert.equal(parseMonth(''), '');
  });

  it('rejects invalid input', () => {
    assert.equal(parseMonth('13.2026'), null);
    assert.equal(parseMonth('Foo 2026'), null);
    assert.equal(parseMonth('2026-03'), null);
  });

  it('respects minDate by month', () => {
    const minDate = new Date(2026, 2, 31);
    assert.equal(parseMonth('03.2026', minDate), '2026-03');
    assert.equal(parseMonth('02.2026', minDate), null);
    assert.equal(parseMonth('Dez 2025', minDate), null);
  });
});

describe('formatMonth', () => {
  it('formats ISO months and ignores anything else', () => {
    assert.equal(formatMonth('2026-03'), 'Mär 2026');
    assert.equal(formatMonth(''), '');
    assert.equal(formatMonth('2026-13'), '');
  });
});
