/** Lowercases and strips accents (é -> e). Umlauts are handled by the callers. */
function base(text: string): string {
  return text
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/** `köln` -> `koeln`: the spelling people use without an umlaut key. */
function expandUmlauts(text: string): string {
  return base(text.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue'));
}

/**
 * True when every word of the query occurs somewhere in the label, in any order.
 * Ignores case and accepts both ways of typing umlauts without the key:
 * `Köln` is found by `köln`, `koeln` and `koln`.
 */
export function matchesQuery(label: string, query: string): boolean {
  const haystacks = [expandUmlauts(label), base(label)];
  return query
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => {
      const needles = [expandUmlauts(word), base(word)];
      return haystacks.some((haystack) => needles.some((needle) => haystack.includes(needle)));
    });
}
