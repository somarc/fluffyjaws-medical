# AEM Async Tree Operations

This site exposed the need for durable AEM tree-operation jobs.

## Attribution

- Process capture: `../aem-process-capture-lab`
- Collaboration skill: `../Collaboration Skill Workspace`
- CLI owner: `../da-cli`
- Proving site: `../fluffyjaws-medical`

## Observation

The commerce catalog introduced a 1000-SKU inventory plus regular site pages. The local DA content tree now contains 1029 HTML pages. Full preview/live publish is a site-scale operation, not a normal quick CLI command.

Earlier bulk preview attempts against large product trees produced `429` responses from `admin.hlx.page`. Serialized preview avoids burst pressure, but it blocks the foreground session and does not provide enough progress or resumability.

## Desired Harness Shape

Tree operations should become durable jobs:

```bash
da preview tree / --commit --yes --job
da job watch <job-id> --json
da job resume <job-id>
da publish tree / --commit --yes --job --from-preview <job-id>
```

The job should track each path independently:

- pending
- previewed
- published
- verified
- failed
- skipped

The foreground agent starts the job and records the job id. An adjunct worker owns polling, retries, backoff, and final reporting.
