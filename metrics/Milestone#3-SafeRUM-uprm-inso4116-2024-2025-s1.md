# Milestone Data

## Date Generated: 2024-12-18
| Developer | Points Closed | Percent Contribution | Projected Grade | Lecture Topic Tasks |
| --------- | ------------- | -------------------- | --------------- | ------------------- |
| Total | 0 | /100% | /100% | 0 |


## Sprint Task Completion

| Developer | S1 (2024/12/17-2024/12/17) | S2 (2024/12/17-2024/12/17) |
|---|---|---|
# Metrics Generation Logs

| Message |
| ------- |
| WARNING: Milestone due date in config doesn't match milestone due date on Github |
| INFO: Found Project(name='SafeRUM', number=1, url='https://github.com/orgs/uprm-inso4116-2024-2025-s1/projects/1', public=False) |
| WARNING: Project visibility is set to private. This can lead to issues not being found if the Personal Access Token doesn't have permissions for viewing private projects. |
| ERROR: Query failed to run, status code 403 |
| { |
|   "documentation_url": "https://docs.github.com/free-pro-team@latest/rest/overview/rate-limits-for-the-rest-api#about-secondary-rate-limits", |
|   "message": "You have exceeded a secondary rate limit. Please wait a few minutes before you try again. If you reach out to GitHub Support for help, please include the request ID 0C00:139DEB:2CB8EE7:5870255:676216BB." |
| } |
| Traceback (most recent call last): |
|   File "/home/runner/work/semester-project-SafeRUM/semester-project-SafeRUM/inso-gh-query-metrics/src/generateMilestoneMetricsForActions.py", line 65, in generateMetricsFromV2Config |
|     team_metrics = getTeamMetricsForMilestone( |
|                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^ |
|   File "/home/runner/work/semester-project-SafeRUM/semester-project-SafeRUM/inso-gh-query-metrics/src/generateTeamMetrics.py", line 238, in getTeamMetricsForMilestone |
|     for issue_dict in fetchIssuesFromGithub(org=org, team=team, logger=logger): |
|   File "/home/runner/work/semester-project-SafeRUM/semester-project-SafeRUM/inso-gh-query-metrics/src/generateTeamMetrics.py", line 170, in fetchIssuesFromGithub |
|     response: dict = runGraphqlQuery(query=get_team_issues, variables=params) |
|                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ |
|   File "/home/runner/work/semester-project-SafeRUM/semester-project-SafeRUM/inso-gh-query-metrics/src/utils/queryRunner.py", line 62, in runGraphqlQuery |
|     raise ConnectionError( |
| ConnectionError: Query failed to run, status code 403 |
| { |
|   "documentation_url": "https://docs.github.com/free-pro-team@latest/rest/overview/rate-limits-for-the-rest-api#about-secondary-rate-limits", |
|   "message": "You have exceeded a secondary rate limit. Please wait a few minutes before you try again. If you reach out to GitHub Support for help, please include the request ID 0C00:139DEB:2CB8EE7:5870255:676216BB." |
| } |
