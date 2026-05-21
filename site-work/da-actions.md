# da-actions log

1. `node ../da-cli/bin/da.js --org somarc --repo fluffyjaws-medical config show`
2. `node ../da-cli/bin/da.js --org somarc --repo fluffyjaws-medical config set org somarc`
3. `node ../da-cli/bin/da.js --org somarc --repo fluffyjaws-medical config set repo fluffyjaws-medical`
4. `node ../da-cli/bin/da.js content put-tree content --dry-run --format json`
5. `node ../da-cli/bin/da.js pipeline quality-gate content/index.html --min-score 70 --format json`
6. `node ../da-cli/bin/da.js pipeline quality-gate content/index.html --min-score 85 --format json`
7. `node ../da-cli/bin/da.js --format json up --port 3000 --fallback none`
8. `node ../da-cli/bin/da.js --commit content put-tree content --format json`
9. `node ../da-cli/bin/da.js preview tree / --verify --format json`
10. `node ../da-cli/bin/da.js pipeline quality-gate https://main--fluffyjaws-medical--somarc.aem.page/ --min-score 85 --format json`
11. `node ../da-cli/bin/da.js site reconcile /index --out site-work/reconcile-index.json --format json`
12. `node ../da-cli/bin/da.js audit contracts --prefix / --format json`
13. `node ../da-cli/bin/da.js site doctor fluffyjaws-medical --org somarc --deep --limit 25 --format json`
14. `node ../da-cli/bin/da.js --commit content put /nav.html content/nav.html --format json`
15. `node ../da-cli/bin/da.js preview page /nav.html --format json`
16. `node ../da-cli/bin/da.js preview page /index.html --format json`
17. `node ../da-cli/bin/da.js preview page /index.html --format json`
18. `node ../da-cli/bin/da.js pipeline quality-gate https://main--fluffyjaws-medical--somarc.aem.page/ --min-score 85 --format json`
19. `node ../da-cli/bin/da.js site doctor fluffyjaws-medical --org somarc --deep --limit 25 --format json`
