USE event_management;

SELECT
    u.city,
    COUNT(DISTINCT r.user_id) AS total_registered_users
FROM Users u
INNER JOIN Registrations r
    ON u.user_id = r.user_id
GROUP BY u.city
ORDER BY total_registered_users DESC
LIMIT 5;