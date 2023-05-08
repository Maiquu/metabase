PREPARE statement7
FROM -- Metabase
SELECT date_add(
    'day',
    -1,
    date_trunc('week', date_add('day', 1, "source"."date"))
  ) AS "date",
  COUNT(*) AS "count"
FROM (
    SELECT "default"."test_data_checkins"."id" AS "id",
      "default"."test_data_checkins"."date" AS "date",
      "default"."test_data_checkins"."user_id" AS "user_id",
      "default"."test_data_checkins"."venue_id" AS "venue_id"
    FROM "default"."test_data_checkins"
  ) "source"
WHERE (
    "source"."date" >= CAST(? AS timestamp WITH time zone)
    AND "source"."date" < CAST(? AS timestamp WITH time zone)
  )
GROUP BY date_add(
    'day',
    -1,
    date_trunc('week', date_add('day', 1, "source"."date"))
  )
ORDER BY date_add(
    'day',
    -1,
    date_trunc('week', date_add('day', 1, "source"."date"))
  ) ASC
