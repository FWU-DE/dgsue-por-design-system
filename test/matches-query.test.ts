import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { matchesQuery } from '../src/lib/matches-query.ts';

describe('matchesQuery', () => {
  const label = 'Städtisches Gymnasium Köln-Lindenthal (100040)';

  it('matches every word on its own, in any order', () => {
    assert.equal(matchesQuery(label, 'Gymn Köln'), true);
    assert.equal(matchesQuery(label, 'köln gymn'), true);
    assert.equal(matchesQuery(label, '  Lindenthal   100040 '), true);
  });

  it('fails when one word is missing', () => {
    assert.equal(matchesQuery(label, 'Gymn Bonn'), false);
  });

  it('ignores case and folds umlauts', () => {
    assert.equal(matchesQuery(label, 'KÖLN'), true);
    assert.equal(matchesQuery(label, 'koeln staedt'), true);
  });

  it('finds umlauts typed without the umlaut key, both ways', () => {
    assert.equal(matchesQuery('Köln', 'Koln'), true);
    assert.equal(matchesQuery('Köln', 'Koeln'), true);
    assert.equal(matchesQuery('Münster', 'munster'), true);
    assert.equal(matchesQuery('Straße', 'strasse'), true);
    assert.equal(matchesQuery('Café Müller', 'cafe muell'), true);
  });

  it('matches umlaut queries against labels spelled without umlauts', () => {
    assert.equal(matchesQuery('Koeln', 'Köln'), true);
  });

  it('matches everything for an empty query', () => {
    assert.equal(matchesQuery(label, ''), true);
    assert.equal(matchesQuery(label, '   '), true);
  });
});
