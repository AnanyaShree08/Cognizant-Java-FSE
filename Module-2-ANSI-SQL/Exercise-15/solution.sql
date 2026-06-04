USE event_management;

SELECT
    s1.event_id,
    s1.session_id AS session_1,
    s1.title AS session_1_title,
    s2.session_id AS session_2,
    s2.title AS session_2_title
FROM Sessions s1
INNER JOIN Sessions s2
    ON s1.event_id = s2.event_id
    AND s1.session_id < s2.session_id
    AND s1.start_time < s2.end_time
    AND s1.end_time > s2.start_time;