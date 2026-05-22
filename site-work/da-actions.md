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
48. `node ../da-cli/bin/da.js preview page /forms/intake.json --format json`
49. `node ../da-cli/bin/da.js content sheets /forms --format json`
50. `node ../da-cli/bin/da.js preview explain /contact --format json`
51. `node ../da-cli/bin/da.js content put-tree content --dry-run --format json`
52. `node ../da-cli/bin/da.js pipeline quality-gate content/index.html --min-score 85 --format json`
53. `node ../da-cli/bin/da.js pipeline quality-gate content/tools/fluff-fit-quiz.html --min-score 85 --format json`
54. `node ../da-cli/bin/da.js pipeline quality-gate content/login.html --min-score 85 --format json`
55. `node ../da-cli/bin/da.js --format json up --port 3002 --fallback none`
56. `node ../da-cli/bin/da.js --commit content put-tree content --format json`
57. `node ../da-cli/bin/da.js preview page /index.html --format json`
58. `node ../da-cli/bin/da.js preview page /nav.html --format json`
59. `node ../da-cli/bin/da.js preview page /footer.html --format json`
60. `node ../da-cli/bin/da.js preview page /login.html --format json`
61. `node ../da-cli/bin/da.js preview page /tools/fluff-fit-quiz.html --format json`
62. `node ../da-cli/bin/da.js preview page /es/index.html --format json`
63. `node ../da-cli/bin/da.js preview page /es/nav.html --format json`
64. `node ../da-cli/bin/da.js preview page /es/footer.html --format json`
65. `node ../da-cli/bin/da.js preview explain /login --format json`
66. `node ../da-cli/bin/da.js preview explain /tools/fluff-fit-quiz --format json`
67. `node ../da-cli/bin/da.js preview explain /es/ --format json`
68. `node ../da-cli/bin/da.js preview explain /es/index --format json`
69. `node ../da-cli/bin/da.js pipeline quality-gate https://main--fluffyjaws-medical--somarc.aem.page/tools/fluff-fit-quiz --min-score 85 --format json`
70. `node ../da-cli/bin/da.js pipeline quality-gate https://main--fluffyjaws-medical--somarc.aem.page/login --min-score 85 --format json`
71. `node ../da-cli/bin/da.js pipeline quality-gate https://main--fluffyjaws-medical--somarc.aem.page/es/ --min-score 85 --format json`
72. `node ../da-cli/bin/da.js site reconcile /tools/fluff-fit-quiz --out site-work/reconcile-fluff-fit-quiz.json --format json`
73. `node ../da-cli/bin/da.js site reconcile /login --out site-work/reconcile-login.json --format json`
74. `node ../da-cli/bin/da.js content put-tree content --dry-run --format json`
75. `node ../da-cli/bin/da.js pipeline quality-gate content/index.html --min-score 85 --format json`
76. `node ../da-cli/bin/da.js --commit content put-tree content --format json`
77. `node ../da-cli/bin/da.js preview page /index.html --format json`
78. `node ../da-cli/bin/da.js preview explain /index --format json`
79. `node ../da-cli/bin/da.js preview page /media/fluffyjaws-medical.mp4 --format json`
80. `node ../da-cli/bin/da.js pipeline quality-gate content/index.html --min-score 85 --format json`
81. `node ../da-cli/bin/da.js content put-tree content --dry-run --format json`
82. `node ../da-cli/bin/da.js --commit content put /index.html content/index.html --format json`
83. `node ../da-cli/bin/da.js preview page /index.html --format json`
84. `node ../da-cli/bin/da.js preview explain /index --format json`
85. `node ../da-cli/bin/da.js preview explain /index --format json`
86. `node ../da-cli/bin/da.js --format json up --port 3003 --fallback none`
87. `node ../da-cli/bin/da.js code --help`
88. `node ../da-cli/bin/da.js pipeline quality-gate content/index.html --min-score 85 --format json`
89. `node ../da-cli/bin/da.js content put /index.html content/index.html --dry-run --format json`
90. `node ../da-cli/bin/da.js --commit content put /index.html content/index.html --format json`
91. `node ../da-cli/bin/da.js --commit content delete /media/fluffyjaws-medical.mp4 --format json`
92. `node ../da-cli/bin/da.js code sync /videos/fluffyjaws-medical.mp4 --format json`
93. `node ../da-cli/bin/da.js preview page /index.html --format json`
94. `node ../da-cli/bin/da.js preview explain /index --format json`
95. `node ../da-cli/bin/da.js content get /media/fluffyjaws-medical.mp4 --format json`
96. `node ../da-cli/bin/da.js pipeline quality-gate content/index.html --min-score 85 --format json`
97. `node ../da-cli/bin/da.js content put /index.html content/index.html --dry-run --format json`
98. `node ../da-cli/bin/da.js --commit content put /index.html content/index.html --format json`
99. `node ../da-cli/bin/da.js code sync /media/fluffyjaws-medical.mp4 --format json`
100. `node ../da-cli/bin/da.js code sync /blocks/video-hero --format json`
101. `node ../da-cli/bin/da.js code sync /blocks/video-hero/video-hero.js --format json`
102. `node ../da-cli/bin/da.js code sync /blocks/video-hero/video-hero.css --format json`
103. `node ../da-cli/bin/da.js preview page /index.html --format json`
104. `node ../da-cli/bin/da.js preview explain /index --format json`
105. `node ../da-cli/bin/da.js code status /media/fluffyjaws-medical.mp4 --format json`
106. `node ../da-cli/bin/da.js code purge --help`
107. `node ../da-cli/bin/da.js --commit code purge /media/fluffyjaws-medical.mp4 --format json`
108. `node ../da-cli/bin/da.js preview explain /index --format json`
