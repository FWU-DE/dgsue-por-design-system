# Changesets

Jede Änderung am Paket bekommt ein Changeset: `pnpm changeset` ausführen, Art der Änderung wählen
(patch / minor / major) und kurz beschreiben. Beim Merge auf `main` sammelt die Release-Action alle
Changesets in einem „Version Packages“-PR; dessen Merge veröffentlicht die neue Version.

- **patch**: Bugfix, kein sichtbarer API-Unterschied
- **minor**: neue Komponente, neue Variante oder Prop (rückwärtskompatibel)
- **major**: alles, was bestehenden App-Code bricht (Prop/Variante entfernt oder umbenannt)
