USE event_management;

SELECT
    u.user_id,
    u.full_name,
    e.status,
    COUNT(e.event_id) AS total_events
FROM Users u
LEFT JOIN Events e
    ON u.user_id = e.organizer_id
GROUP BY
    u.user_id,
    u.full_name,
    e.status
ORDER BY u.user_id;