SELECT id, kyu, languages, description, starter_code, name, examples, tags FROM katas
WHERE kyu = $1;
