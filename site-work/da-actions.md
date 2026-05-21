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
20. `node ../da-cli/bin/da.js --org scdemos --repo demo content list / --format json`
21. `node ../da-cli/bin/da.js --org scdemos --repo demo content list /forms --format json`
22. `node ../da-cli/bin/da.js --org scdemos --repo demo content tree /forms --ext html --format json`
23. `node ../da-cli/bin/da.js --org scdemos --repo demo content get /forms/contact-us.json -o content/forms/contact-us.json`
24. `node ../da-cli/bin/da.js --org scdemos --repo demo content get /forms/contact-us-thanks.html -o content/forms/contact-us-thanks.html`
25. `node ../da-cli/bin/da.js --org scdemos --repo demo content get /footer.html -o content/footer.html`
26. `node ../da-cli/bin/da.js --org scdemos --repo demo content get /nav.html -o content/nav.html`
27. `node ../da-cli/bin/da.js --org scdemos --repo demo content get /index.html -o content/index.html`
28. `node ../da-cli/bin/da.js --org scdemos --repo demo content get /start-here.html -o content/start-here.html`
29. `node ../da-cli/bin/da.js --org scdemos --repo demo content get /guided-journey.html -o content/guided-journey.html`
30. `node ../da-cli/bin/da.js --org scdemos --repo demo content tree / --ext html --format json`
31. `node ../da-cli/bin/da.js --org scdemos --repo demo content get /fragments/contact-us.html -o content/fragments/contact-us.html`
32. `node ../da-cli/bin/da.js --org scdemos --repo demo content get /docs/library/blocks/form.html -o content/docs/library/blocks/form.html`
33. `node ../da-cli/bin/da.js --org scdemos --repo demo content get /docs/library/blocks/form-thank-you.html -o content/docs/library/blocks/form-thank-you.html`
34. `node ../da-cli/bin/da.js --org scdemos --repo demo content get /demo-docs/usecases/how-to-forms.html -o content/demo-docs/usecases/how-to-forms.html`
35. `node ../da-cli/bin/da.js block inspect form --format json`
36. `node ../da-cli/bin/da.js preview explain /contact --format json`
37. `node ../da-cli/bin/da.js content put-tree content --dry-run --format json`
38. `node ../da-cli/bin/da.js --format json up --port 3001 --fallback none`
39. `node ../da-cli/bin/da.js content sheets /forms --format json`
40. `node ../da-cli/bin/da.js --commit content put-tree content --format json`
41. `node ../da-cli/bin/da.js preview page /contact.html --format json`
42. `node ../da-cli/bin/da.js preview page /forms/intake-thanks.html --format json`
43. `node ../da-cli/bin/da.js content sheets /forms --format json`
44. `node ../da-cli/bin/da.js preview explain /contact --format json`
45. `node ../da-cli/bin/da.js --commit content put /contact.html content/contact.html --format json`
46. `node ../da-cli/bin/da.js preview page /contact.html --format json`
47. `node ../da-cli/bin/da.js preview explain /contact --format json`
