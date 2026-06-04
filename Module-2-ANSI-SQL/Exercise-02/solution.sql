USE event_management;

SELECT
    e.event_id,
    e.title,
    COUNT(f.feedback_id) AS total_feedbacks,
    ROUND(AVG(f.rating), 2) AS average_rating
FROM Events e
INNER JOIN Feedback f
    ON e.event_id = f.event_id
GROUP BY
    e.event_id,
    e.title
HAVING COUNT(f.feedback_id) >= 10
ORDER BY average_rating DESC;