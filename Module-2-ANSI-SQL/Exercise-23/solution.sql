USE event_management;

SELECT
    YEAR(registration_date) AS year,
    MONTH(registration_date) AS month,
    COUNT(*) AS registration_count
FROM Registrations
WHERE registration_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
GROUP BY
    YEAR(registration_date),
    MONTH(registration_date)
ORDER BY
    year,
    month;