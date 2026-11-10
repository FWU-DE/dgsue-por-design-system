# @fwu-de/por-ui

Gemeinsame UI-Komponenten und Design-Tokens (NRW Corporate Identity) für **zielvereinbarung** und **nrw-nutzerverwaltung** (`telli-usermanagement`).

Beide Apps beziehen ihre UI-Basiskomponenten und Tokens ausschließlich aus diesem Paket; in den Apps liegen unter `src/components/ui/` nur noch fachliche Komponenten.

Basis sind die shadcn/ui-Komponenten (Stil `new-york`) auf Radix, Tailwind CSS v4 und lucide. Der Stand stammt aus zielvereinbarung. Wo nrw-nutzerverwaltung etwas zusätzlich hatte, ist es übernommen (siehe [Herkunft](#herkunft-und-unterschiede-zu-den-apps)).

## Komponenten

| Import | Exporte |
| --- | --- |
| `@fwu-de/por-ui/accordion` | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` |
| `@fwu-de/por-ui/alert` | `Alert`, `AlertTitle`, `AlertDescription` |
| `@fwu-de/por-ui/alert-dialog-simple` | `AlertDialogSimple` |
| `@fwu-de/por-ui/badge` | `Badge`, `badgeVariants` |
| `@fwu-de/por-ui/button` | `Button`, `buttonVariants` |
| `@fwu-de/por-ui/calendar` | `Calendar`, `CalendarDayButton` (Locale `de`) |
| `@fwu-de/por-ui/card` | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` |
| `@fwu-de/por-ui/carousel` | `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`, `CarouselApi` |
| `@fwu-de/por-ui/checkbox` | `Checkbox` (inkl. `checked="indeterminate"`) |
| `@fwu-de/por-ui/collapsible` | `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` |
| `@fwu-de/por-ui/command` | `Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, ... |
| `@fwu-de/por-ui/confirmation-dialog` | `ConfirmationDialog` |
| `@fwu-de/por-ui/date-picker-input` | `DatePickerInput` |
| `@fwu-de/por-ui/dialog` | `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`, `DialogPortal`, `DialogOverlay` |
| `@fwu-de/por-ui/dropdown-menu` | `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, ... |
| `@fwu-de/por-ui/form` | `Form`, `FormField`, `FormItem`, `FormLabel` (`required`), `FormControl`, `FormDescription`, `FormMessage`, `useFormField` (braucht `react-hook-form`) |
| `@fwu-de/por-ui/input` | `Input` |
| `@fwu-de/por-ui/label` | `Label` |
| `@fwu-de/por-ui/month-picker-input` | `MonthPickerInput` |
| `@fwu-de/por-ui/popover` | `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverAnchor` |
| `@fwu-de/por-ui/progress` | `Progress` |
| `@fwu-de/por-ui/searchable-select` | `SearchableSelect`, `SearchableOption`, `matchesQuery` |
| `@fwu-de/por-ui/select` | `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator`, ... |
| `@fwu-de/por-ui/sheet` | `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`, ... |
| `@fwu-de/por-ui/table` | `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead` (`icon`, `onIconClick`), `TableCell`, `TableCaption` |
| `@fwu-de/por-ui/tabs` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |
| `@fwu-de/por-ui/textarea` | `Textarea` |
| `@fwu-de/por-ui/textrahmen` | `Textrahmen` (Fläche mit NRW-L-Ecken) |
| `@fwu-de/por-ui/tooltip` | `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` |
| `@fwu-de/por-ui/cn` | `cn()` (clsx + tailwind-merge) |
| `@fwu-de/por-ui/styles.css` | Tokens + Basis-Styles + NRW-L-Ecken |

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

## Entwicklung

```bash
pnpm install
pnpm checks      # Typecheck, Tests, Build, Prüfung des Build-Ergebnisses, Tailwind-Kompilierung, publint/attw
```

- Komponenten liegen in `src/components/`, Tokens in `src/styles/tokens.css`.
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
| `carousel` | Screenreader-Texte auf Deutsch |
| Tokens | `.dark`-Variante ist klassenbasiert (`@custom-variant dark`), passend zu den `.dark`-Tokens. Vorher griffen `dark:`-Utilities über die System-Einstellung, die Farben aber nicht |

Alle übrigen Komponenten und alle Tokens sind identisch mit zielvereinbarung.

**Was sich für nrw-nutzerverwaltung sichtbar ändert** (vor dem Merge prüfen, z. B. mit Playwright-Screenshots):

- Schrift `text-base` statt `text-sm` bei Button, Input, Select, Textarea, Label, Table, `CardDescription`
- Button: `default` `h-10` statt `h-9`, `lg` `h-11`, `icon` `h-10 w-10`, `sm` mit `text-sm` statt `text-xs`, Schatten `shadow`/`shadow-sm` statt `shadow-xs`
- Input, Select, Textarea: `h-10`; Fokus über Rahmenfarbe statt `ring`; Fehlerzustand `aria-[invalid=true]` mit rotem 2px-Rahmen; `md:text-sm` entfällt
- Form: `FormLabel` mit Prop `required` (Sternchen) und `font-semibold` bei Fehler; `FormDescription`/`FormMessage` `text-sm` statt `text-[0.8rem]`
- Card: `rounded-md`; `CardContent` `px-6 pb-6`; `CardTitle` `text-lg`; neue Variante `accented` (NRW-L-Ecken); `success/warning/error/info` nutzen Tokens statt Tailwind-Grün/Amber/Rot/Blau
- Badge: rund (`rounded-full`), Status-Varianten in NRW-Farben
- Table: Kopfzeile in `bg-primary` mit heller Schrift
- Checkbox: `h-5 w-5` mit `border-2 border-primary`
- Accordion: Trigger ohne Hover-Unterstreichung, lange Titel werden gekürzt
- Calendar: deutsche Locale
- **Dialog: `onOpenAutoFocus` verhindert, dass der Fokus beim Öffnen in den Dialog springt.** Das kommt aus zielvereinbarung, ist für Tastatur- und Screenreader-Nutzer aber ungünstig und sollte geprüft werden
- Fokus: `--ring` ist Nachtblau (`--nrw-blue-500`, dunkel `--nrw-blue-200`) statt `neutral-400`. Inputs, Select und Textarea zeigen im Fokus einen 2px-Rahmen, Button und Checkbox einen 2px-Ring mit Abstand. Vorher war der Fokus-Rahmen heller als der normale Rahmen (WCAG 1.4.11)
- Status-Farben: neue Tokens `--success`, `--warning`, `--info`. Badge `success`/`warning`/`info` sind damit vollflächig grün/amber/blau, Card-Varianten haben einen getönten Rahmen. Vorher waren `info` und `warning` (Badge) bzw. `success`, `warning` und `info` (Card) gleich grau. `--warning` (`#b45309`) ist keine NRW-Landesfarbe und sollte mit dem Design abgestimmt werden
- Date-/Month-Picker: `h-10` und `text-base` wie `Input` (vorher `h-9`, `md:text-sm`)
- Dialog-Footer: Abstand per `gap-2`, auch untereinander auf kleinen Bildschirmen
- Tokens: `--nrw-blue-500` ist `#003064` (nrw: `#003166`), `--input` ist `neutral-500` (nrw: `neutral-200`). Außerdem korrigiert: `--nrw-red-100` war in nrw ein ungültiger Farbwert (`#FF0DAE1`)

**Bewusst nicht im Paket** (bleibt App-Entscheidung):

- Root-Schriftgröße `html { font-size: 112.5% }` (zielvereinbarung)
- Laden von Open Sans (`next/font/google`). Die Tokens erwarten die Schrift, ohne sie greift der System-Fallback
- alte Klassen `.btn-primary`, `.form-input`, `.card`, ... aus der globals.css von zielvereinbarung
- fachliche Komponenten (`field-hint`, `inherited-field-wrapper`, `expand-collapse-*`, `status-badge`, ...). Sie bleiben in der App und importieren die Basiskomponenten aus dem Paket
- Schatten: Die `--shadow-*`-Variablen aus zielvereinbarung sind entfernt. Tailwind schreibt Schatten beim Build fest in die Utilities, die Overrides in `:root` haben nie gewirkt. Es gelten Tailwinds Standard-Schatten (wie bisher auch)
- Body-Styles der Apps (`line-height`, Font-Smoothing, `scrollbar-gutter`, `prefers-reduced-motion`-Regeln). Die bleiben in der `globals.css` der App

**Offener Punkt:** Dialog, Select, Tabs usw. nutzen Animationsklassen (`animate-in`, `fade-in-0`, ...). In keiner der beiden Apps ist dafür ein Plugin aktiv: `tailwindcss-animate` ist zwar installiert, wird aber von Tailwind v4 ohne `@plugin` nicht geladen. Die Klassen tun also aktuell nichts. Dasselbe gilt für `animate-accordion-up/down` (keine Keyframes definiert). Falls Animationen gewünscht sind, `tw-animate-css` ins Paket aufnehmen. Das ist eine sichtbare Änderung für beide Apps.
