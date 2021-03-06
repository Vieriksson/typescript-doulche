## Filer

**package.json**

Innehåller lite go metadata om projektet.

- scripts:

  - Script som kan köras mha pakethanteraren, tex yarn start, yarn dev alternativt npm run start, npm run dev
  - yarn dev / npm run dev: Kommer att starta en lokal dev-server som startas om varje gång du ändras i något fil. OTROLIGT trevligt.
  - yarn build: Bygger typescript-projektet till javascript och lägger tutti i dist-folder (pga vi specade det i tsconfig.json)
  - yarn start: Startar det byggda projektet.

- devDependencies:

  - Paket som används under utveckling, men inte vid runtime och behöver därmed inte vara med i bundlen. Typ typescript, test-ramverk osv.
  - Om du installerar ett ramverk som inte är byggt i typescript finns det ofta typescript-typer för det ramverket. Se tex @types/express.

- dependencies:

  - Paket som används runtime.

**tsconfig.json**

Innehåller settings för typescript. Finns en hel drös. Finns en massa bra [baser osv](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) man kan extenda beroende på vilken environment man vill köra typescript i. Jag tog bara en från ett tidigare projekt pga lat.

**.prettierrc.json**

Settings för kodformateraren osv. Använder främst då jag tycker semikolon stökar ner så förbenat.

**yarn.lock**

Automatiskt genererad fil av pakethanterar för att hålla koll på alla paketberoenden och i sin tur deras beroenden. Svart hål! Skapat i stället en package-lock.json med samma syfte om du kör npm.
