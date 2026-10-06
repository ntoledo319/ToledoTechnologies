Migration acceptance evaluation packet — fictional data

This is actual output from Toledo Migration Acceptance Kit1.0.0. Six source and six target rows do not establish a clean migration. Source:1matched,1changed,1unverified,1missing,1rejected_but_present,1ambiguous_target. Target:4accounted,2duplicate_target. Strict exit status1 means reported but not clean.

Open output/report.html locally or inspect output/report.json and output/findings.csv. The report contains fingerprints of source.csv,target.csv,rejects.csv and the custom sample-spec.json. The result content hash excludes generation time.

Sample mapping: customer_id to legacy_id; compare balance dollars after money_minor:2 with balance_cents after number:0; blank values are unknown.104 is declared excluded but remains in target.106 has duplicate target rows. This packet does not include the paid Python tool, paid procedure or licence source. Existing buyers can reproduce using their reconcile.py with:
python3 reconcile.py --spec sample-spec.json --source source.csv --target target.csv --rejects rejects.csv --out reproduced --strict

This fictional example is not a customer case, live database check or acceptance approval. A human must verify source completeness, rules, exceptions and business scope. Inspect the free checklist, product and current licence at https://toledotechnologies.com/kit/ .

Publication adds one restrictive Content Security Policy meta tag to the generated HTML, allowing only its existing stylesheet. Report data, wording and layout are unchanged; JSON and findings are unmodified tool output.
