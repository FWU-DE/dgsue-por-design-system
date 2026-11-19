# @fwu-de/por-ui

## 0.1.0

### Minor Changes

- cfb5ce4: Erste Version: NRW-Design-Tokens, Basis-Styles (inkl. NRW-L-Ecken) und 29 Komponenten aus zielvereinbarung und
  nrw-nutzerverwaltung (accordion, alert, alert-dialog-simple, badge, button, calendar, card, carousel, checkbox,
  collapsible, command, confirmation-dialog, date-picker-input, dialog, dropdown-menu, form, input, label,
  month-picker-input, popover, progress, searchable-select, select, sheet, table, tabs, textarea, textrahmen, tooltip).
- 1287a0a: Komponenten-Tokens (`--por-*`): Höhen, Schriftgrößen, Fokusring, Status-Farben von Badge und Card,
  Kopfzeile der Table u. a. lassen sich pro App überschreiben. Die Standardwerte entsprechen dem
  bisherigen Aussehen. Neu: Alert-Varianten `info` und `warning`, `SearchableSelect` mit
  `showSearchIcon`; `SearchableSelect` stürzt nicht mehr ab, wenn das Label des gewählten Eintrags
  fehlt, und zeigt bei `value=""` den Platzhalter.

  `CardTitle` hat wieder den Abstand von 1rem zwischen Icon und Text wie zuvor in beiden Apps.
  `DatePickerInput` und `MonthPickerInput` haben eigene Tokens für Höhe und Schrift
  (`--por-picker-*`, Standard wie Input).

  Die Quelldateien liegen nach Herkunft in `shadcn/`, `angepasst/` und `eigene/`. Die Import-Pfade
  (`@fwu-de/por-ui/<name>`) bleiben gleich.
