USE event_management;

SELECT
    speaker_name,
    COUNT(session_id) AS total_sessions
FROM Sessions
GROUP BY speaker_name
HAVING COUNT(session_id) > 1
ORDER BY total_sessions DESC;