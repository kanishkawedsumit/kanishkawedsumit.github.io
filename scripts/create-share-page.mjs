import { mkdir, readFile, writeFile } from 'node:fs/promises';

const html = await readFile('dist/index.html', 'utf8');
const invitationHtml = html.replace(
  'https://kanishkawedsumit.github.io/',
  'https://kanishkawedsumit.github.io/invite/',
);

await mkdir('dist/invite', { recursive: true });
await writeFile('dist/invite/index.html', invitationHtml);
