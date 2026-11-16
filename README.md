# @fwu-de/por-ui

Gemeinsame UI-Komponenten und Design-Tokens (NRW Corporate Identity) für **zielvereinbarung** und **nrw-nutzerverwaltung** (`telli-usermanagement`).

Beide Apps beziehen ihre UI-Basiskomponenten und Tokens ausschließlich aus diesem Paket; in den Apps liegen unter `src/components/ui/` nur noch fachliche Komponenten.

Basis sind die shadcn/ui-Komponenten (Stil `new-york`) auf Radix, Tailwind CSS v4 und lucide. Der Stand stammt aus zielvereinbarung. Wo nrw-nutzerverwaltung etwas zusätzlich hatte, ist es übernommen (siehe [Herkunft](#herkunft-und-unterschiede-zu-den-apps)).

## Komponenten

Die Quelldateien liegen nach Herkunft getrennt in drei Ordnern, entsprechend der Gliederung im Figma „ShadCN NRW“. Die Import-Pfade sind davon unabhängig: immer `@fwu-de/por-ui/<name>`.

### shadcn-Standard (`src/components/shadcn/`)

Komponenten aus shadcn/ui (Stil `new-york`). Geändert sind Tokens, deutsche Screenreader-Texte und Fehlerbehebungen. Die API ist nur an wenigen Stellen erweitert und bleibt rückwärtskompatibel: Button-Größe `md`, `Checkbox` mit `indeterminate`, `FormLabel` mit `required`, `TableHead` mit Icon. Details stehen unter [Herkunft](#herkunft-und-unterschiede-zu-den-apps). Figma: Seiten unter „Components shadcn“.

| Import | Exporte |
| --- | --- |
| `@fwu-de/por-ui/accordion` | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` |
| `@fwu-de/por-ui/button` | `Button`, `buttonVariants` |
| `@fwu-de/por-ui/calendar` | `Calendar`, `CalendarDayButton` (Locale `de`) |
| `@fwu-de/por-ui/carousel` | `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`, `CarouselApi` |
| `@fwu-de/por-ui/checkbox` | `Checkbox` (inkl. `checked="indeterminate"`) |
| `@fwu-de/por-ui/collapsible` | `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` |
| `@fwu-de/por-ui/command` | `Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, ... |
| `@fwu-de/por-ui/dialog` | `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`, `DialogPortal`, `DialogOverlay` |
| `@fwu-de/por-ui/dropdown-menu` | `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, ... |
| `@fwu-de/por-ui/form` | `Form`, `FormField`, `FormItem`, `FormLabel` (`required`), `FormControl`, `FormDescription`, `FormMessage`, `useFormField` (braucht `react-hook-form`) |
| `@fwu-de/por-ui/input` | `Input` |
| `@fwu-de/por-ui/label` | `Label` |
| `@fwu-de/por-ui/popover` | `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverAnchor` |
| `@fwu-de/por-ui/select` | `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator`, ... |
| `@fwu-de/por-ui/sheet` | `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`, ... |
| `@fwu-de/por-ui/table` | `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead` (`icon`, `onIconClick`), `TableCell`, `TableCaption` |
| `@fwu-de/por-ui/tabs` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |
| `@fwu-de/por-ui/textarea` | `Textarea` |
| `@fwu-de/por-ui/tooltip` | `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` |

### shadcn angepasst (`src/components/angepasst/`)

shadcn-Komponenten mit eigenen Varianten oder eigenem Aufbau für NRW (z. B. Status-Varianten, NRW-L-Ecken). Figma: „shadcn – angepasst“.

| Import | Exporte |
| --- | --- |
| `@fwu-de/por-ui/alert` | `Alert` (Varianten `default`, `destructive`, `info`, `warning`), `AlertTitle`, `AlertDescription` |
| `@fwu-de/por-ui/badge` | `Badge`, `badgeVariants` |
| `@fwu-de/por-ui/card` | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` |
| `@fwu-de/por-ui/progress` | `Progress` |

### Eigene Komponenten (`src/components/eigene/`)

Nicht in shadcn/ui enthalten, aus shadcn-Komponenten zusammengesetzt.

| Import | Exporte |
| --- | --- |
| `@fwu-de/por-ui/alert-dialog-simple` | `AlertDialogSimple` |
| `@fwu-de/por-ui/confirmation-dialog` | `ConfirmationDialog` |
| `@fwu-de/por-ui/date-picker-input` | `DatePickerInput` |
| `@fwu-de/por-ui/month-picker-input` | `MonthPickerInput` |
| `@fwu-de/por-ui/searchable-select` | `SearchableSelect`, `SearchableOption`, `matchesQuery` |
| `@fwu-de/por-ui/textrahmen` | `Textrahmen` (Fläche mit NRW-L-Ecken) |

### Hilfsfunktionen und Styles

| Import | Exporte |
| --- | --- |
| `@fwu-de/por-ui/cn` | `cn()` (clsx + tailwind-merge) |
| `@fwu-de/por-ui/styles.css` | Tokens + Basis-Styles + NRW-L-Ecken |

Neue Komponente: in den passenden Ordner legen und in `package.json` unter `exports` eintragen (`pnpm check:dist` meldet fehlende Einträge). Wird eine shadcn-Komponente über Tokens und Texte hinaus verändert (neue Varianten, anderer Aufbau), zieht sie nach `angepasst/` um.

## Einbinden in eine App

**1. Registry konfigurieren:** `.npmrc` im App-Repo (enthält kein Secret):

```ini
@fwu-de:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Lokal einmalig `export NODE_AUTH_TOKEN=$(gh auth token)` setzen. Das funktioniert, wenn `gh` mit dem Scope `read:packages` angemeldet ist (`gh auth refresh -s read:packages`). Alternativ einen persönlichen Token mit `read:packages` verwenden.

**2. Installieren:**

```bash
pnpm add @fwu-de/por-ui
```

In zielvereinbarung zusätzlich `'@fwu-de/*'` unter `minimumReleaseAgeExclude` in `pnpm-workspace.yaml` eintragen, sonst ist jedes neue Release 7 Tage lang blockiert.

**3. Styles:** `src/app/globals.css` der App:

```css
@import 'tailwindcss';
@import '@fwu-de/por-ui/styles.css';

/* App-spezifische Anpassungen danach, z. B.: */
/* :root { --primary: var(--nrw-green-accessible); } */
```

Ein eigenes `@source` für das Paket braucht die App nicht: `styles.css` bringt es mit und zeigt relativ auf die gebauten Komponenten.

Die Token-Blöcke (`@theme`, `:root`, `.dark`) in der App-`globals.css` werden dadurch überflüssig und können raus. Die Tokens stehen in `@theme inline`. Overrides wie `--primary` wirken deshalb überall, auch wenn `.dark` nur auf einem Teilbaum sitzt.

**4. Komponenten nutzen:**

```tsx
import { Button } from '@fwu-de/por-ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@fwu-de/por-ui/card';
```

Umstellen einer bestehenden App, Komponente für Komponente:

```bash
# Beispiel: alle Button-Imports umstellen, danach src/components/ui/button.tsx löschen
grep -rl "@/components/ui/button'" src | xargs sed -i '' "s#'@/components/ui/button'#'@fwu-de/por-ui/button'#"
# unter Linux (GNU sed kennt kein -i ''):
grep -rl "@/components/ui/button'" src | xargs perl -pi -e "s#'\@/components/ui/button'#'\@fwu-de/por-ui/button'#"
```

**5. CI/Docker der App:** Jeder `pnpm install`-Schritt in GitHub Actions braucht `env: NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}`, und der Job braucht `permissions: packages: read` (oder `write`). Zusätzlich im Paket unter *Package settings -> Manage Actions access* das App-Repo mit Leserecht eintragen.

Im Dockerfile kommt der Token als BuildKit-Secret, damit er in keinem Layer landet:

```dockerfile
# syntax=docker/dockerfile:1
RUN --mount=type=secret,id=node_auth_token,env=NODE_AUTH_TOKEN,required=true \
    printf '%s\n' '@fwu-de:registry=https://npm.pkg.github.com' '//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}' > .npmrc \
    && pnpm install --frozen-lockfile --prod=false \
    && rm -f .npmrc
```

Beim Build: `docker/build-push-action` mit `secrets: node_auth_token=${{ secrets.GITHUB_TOKEN }}` bzw. `docker build --secret id=node_auth_token,env=NODE_AUTH_TOKEN ...`.

### Übergangsweise: Paket als Datei statt aus der Registry

Solange das Repo nicht in der Organisation FWU-DE liegt, kann das Paket nicht unter `@fwu-de` in GitHub Packages veröffentlicht werden. Bis dahin liegt das gebaute Paket als Datei im App-Repo:

```bash
# im Design-System
pnpm checks && pnpm pack --pack-destination ../<app>/vendor
# in der App
pnpm add ./vendor/fwu-de-por-ui-<version>.tgz
```

Im Dockerfile der App muss `vendor/` vor `pnpm install` kopiert werden (`COPY package.json pnpm-lock.yaml ./` und `COPY vendor ./vendor`). Ein Token braucht es nicht. Schritt 1 und 5 oben entfallen. Später wird nur die Abhängigkeit in der `package.json` auf die Registry-Version umgestellt, Imports und Styles bleiben gleich.

Wichtig: Bei jeder Änderung `version` in der `package.json` erhöhen (bzw. `pnpm changeset version`). Sonst hat die neue Datei denselben Namen, und pnpm meldet einen Prüfsummenfehler.

## Aussehen pro App anpassen

Größen und Farben, in denen sich die Apps unterscheiden, sind Komponenten-Tokens (`--por-*`, Liste mit Standardwerten in [`src/styles/tokens.css`](src/styles/tokens.css)). Die App überschreibt sie in ihrer `globals.css` nach dem Import:

```css
@import 'tailwindcss';
@import '@fwu-de/por-ui/styles.css';

:root {
  --por-control-height: 2.25rem; /* Button, Input, Select: h-9 statt h-10 */
  --por-text-ui: 0.875rem; /* text-sm statt text-base */
  --por-text-ui-leading: calc(1.25 / 0.875);
  --por-card-title-size: initial; /* erbt die Schriftgröße */
}
```

`initial` heißt: Die Komponente setzt die Eigenschaft nicht, sie wird vom Elternelement geerbt.

| Token | Wirkt auf |
| --- | --- |
| `--por-text-ui`, `--por-text-ui-leading` | Schrift in Button, Input/Textarea (ab `md`), Select, Label, Table, CardDescription |
| `--por-text-ui-sm`, `--por-text-ui-sm-leading` | Button `size="sm"` |
| `--por-text-hint`, `--por-text-hint-leading` | FormDescription, FormMessage |
| `--por-control-height`, `--por-control-height-lg` | Button (default, icon, lg), Input, SelectTrigger |
| `--por-picker-height`, `--por-picker-text`, `--por-picker-text-leading` | DatePickerInput, MonthPickerInput (Standard: wie Input) |
| `--por-focus-ring-width`, `--por-focus-ring-offset` | Fokusring von Button und Checkbox |
| `--por-input-foreground`, `--por-select-icon` | Textfarbe von Input, Textarea, Select; Select-Pfeil |
| `--por-button-shadow` | Schatten von Button (außer ghost, link) |
| `--por-checkbox-size`, `--por-checkbox-border-width`, `--por-checkbox-border` | Checkbox |
| `--por-badge-radius`, `--por-badge-{success,info,warning,error}[-foreground]` | Badge |
| `--por-card-radius`, `--por-card-title-size`, `--por-card-title-gap`, `--por-card-content-padding` | Card, CardTitle, CardContent |
| `--por-card-{success,warning,error,info}[-foreground,-border]` | Card-Varianten |
| `--por-alert-{info,warning}[-foreground,-border,-icon]` | Alert-Varianten `info` und `warning` |
| `--por-table-head`, `--por-table-head-foreground`, `--por-table-header-foreground`, `--por-table-head-weight`, `--por-table-head-row-hover`, `--por-table-head-icon-hover` | Kopfzeile von Table |
| `--por-form-label-error-weight`, `--por-form-message-weight` | FormLabel und FormMessage bei Fehlern |

Neue Unterschiede zwischen den Apps kommen als weiteres Token dazu, nicht als App-Kopie der Komponente.

## Entwicklung

```bash
pnpm install
pnpm checks      # Typecheck, Tests, Build, Prüfung des Build-Ergebnisses, Tailwind-Kompilierung, publint/attw
```

- Komponenten liegen in `src/components/shadcn/`, `angepasst/` und `eigene/` (siehe [Komponenten](#komponenten)), Tokens in `src/styles/tokens.css`.
- **Imports innerhalb des Pakets immer relativ und mit Endung** (`'../lib/cn.ts'`, `'./label.tsx'`). Der Build schreibt sie auf `.js` um.
- Kein Import von `next`: Links laufen über `<Button asChild><Link .../></Button>`. So läuft das Paket mit Next 15 und 16.
- Komponenten mit State, Effects oder Radix-Primitives brauchen `'use client'` in der ersten Zeile. `pnpm check:dist` prüft, dass die Direktive den Build übersteht.
- CSS-Variablen in Tailwind-Klassen als `origin-(--radix-...)` oder `origin-[var(--radix-...)]` schreiben, nicht als `origin-[--radix-...]` (Tailwind v3). `pnpm check:dist` meldet die alte Schreibweise.
- Reine Logik (Parsen, Suchen) liegt in `src/lib/` und hat Tests in `test/`.

### Änderungen veröffentlichen

1. Änderung machen, `pnpm changeset` ausführen und Art (patch/minor/major) plus Beschreibung angeben.
2. PR -> Review -> Merge auf `main`.
3. Die Release-Action öffnet bzw. aktualisiert den PR **„chore: Version Packages“** (Versionsnummer + CHANGELOG).
4. Mit dem Merge dieses PRs wird die neue Version in GitHub Packages veröffentlicht. Dependabot in den Apps öffnet danach die Update-PRs.

Hinweis: PRs, die die Action mit `GITHUB_TOKEN` anlegt, starten keine weiteren Workflows. Der PR „Version Packages“ hat also keine CI-Checks. Sind Checks per Branch Protection Pflicht, braucht `changesets/action` ein Token einer GitHub App (oder einen PAT).

Breaking Changes möglichst vermeiden: neue Variante/Prop hinzufügen, alte als `@deprecated` markieren, beide Apps umstellen, erst dann entfernen (Major).

## Herkunft und Unterschiede zu den Apps

Grundlage ist der Stand aus **zielvereinbarung** (`main`). Abweichungen davon:

| Komponente | Änderung / Herkunft |
| --- | --- |
| `button` | Größe `md` (`h-9`) aus nrw-nutzerverwaltung übernommen, damit dortiger Code weiter funktioniert |
| `checkbox` | `indeterminate`-Zustand (Minus-Icon) aus nrw-nutzerverwaltung (`group-poc`, 813bd53) |
| `select` | `max-h-[var(--radix-...)]` / `origin-[var(--radix-...)]` aus nrw-nutzerverwaltung (`group-poc`). Die Schreibweise `max-h-[--radix-...]` aus zielvereinbarung ist Tailwind v3 und wirkt in v4 nicht |
| `dialog` | Screenreader-Text des Schließen-Buttons „Schließen“ statt „Close“ |
| `searchable-select` | aus nrw-nutzerverwaltung (`group-poc`); `matchesQuery` liegt in `src/lib/matches-query.ts` und ist mit `pnpm test` getestet |
| `date-picker-input`, `month-picker-input` | `assignRef` aus `@/lib/utils` der App liegt jetzt in `src/lib/assign-ref.ts`; Parsen und Formatieren in `src/lib/date-input.ts` (getestet). Feld lässt sich leeren (`onChange('')`), `minDate` wird tagesgenau verglichen, Höhe und Fokus wie `Input` |
| `tooltip`, `popover` | `origin-[--radix-...]` (Tailwind v3, wirkungslos) durch `origin-(--radix-...)` ersetzt |
| `confirmation-dialog` | Lässt sich während `isLoading` bzw. eines laufenden `onConfirm` nicht per Esc/Overlay schließen; Doppelklick wird abgefangen |
| `progress` | `value` wird an Radix weitergegeben (`aria-valuenow`) |
| `command` | `CommandDialog` hat einen unsichtbaren `DialogTitle` (Props `title`, `description`) |
| `table` | `TableHead` mit Prop `iconLabel` für den Icon-Button |
| `checkbox` | `indeterminate` wird auch mit `defaultChecked` angezeigt |
| `searchable-select` | Pfeiltasten führen aus dem Suchfeld in die Liste; Suche findet `Köln` auch über `Koln` |
| `searchable-select` | `showSearchIcon`, `value=""` zeigt den Platzhalter, kein Absturz bei fehlendem Label (aus nrw-nutzerverwaltung) |
| `alert` | Varianten `info` und `warning` aus nrw-nutzerverwaltung |
| `carousel` | Screenreader-Texte auf Deutsch |
| Tokens | `.dark`-Variante ist klassenbasiert (`@custom-variant dark`), passend zu den `.dark`-Tokens. Vorher griffen `dark:`-Utilities über die System-Einstellung, die Farben aber nicht |

Alle übrigen Komponenten und alle Tokens sind identisch mit zielvereinbarung.

**Bewusst nicht im Paket** (bleibt App-Entscheidung):

- Root-Schriftgröße `html { font-size: 112.5% }` (zielvereinbarung)
- Laden von Open Sans (`next/font/google`). Die Tokens erwarten die Schrift, ohne sie greift der System-Fallback
- alte Klassen `.btn-primary`, `.form-input`, `.card`, ... aus der globals.css von zielvereinbarung
- fachliche Komponenten (`field-hint`, `inherited-field-wrapper`, `expand-collapse-*`, `status-badge`, ...). Sie bleiben in der App und importieren die Basiskomponenten aus dem Paket
- Schatten: Die `--shadow-*`-Variablen aus zielvereinbarung sind entfernt. Tailwind schreibt Schatten beim Build fest in die Utilities, die Overrides in `:root` haben nie gewirkt. Es gelten Tailwinds Standard-Schatten (wie bisher auch)
- Body-Styles der Apps (`line-height`, Font-Smoothing, `scrollbar-gutter`, `prefers-reduced-motion`-Regeln). Die bleiben in der `globals.css` der App

**Offener Punkt:** Dialog, Select, Tabs usw. nutzen Animationsklassen (`animate-in`, `fade-in-0`, ...). In keiner der beiden Apps ist dafür ein Plugin aktiv: `tailwindcss-animate` ist zwar installiert, wird aber von Tailwind v4 ohne `@plugin` nicht geladen. Die Klassen tun also aktuell nichts. Dasselbe gilt für `animate-accordion-up/down` (keine Keyframes definiert). Falls Animationen gewünscht sind, `tw-animate-css` ins Paket aufnehmen. Das ist eine sichtbare Änderung für beide Apps.
