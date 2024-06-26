import slugg from "slugg";

import type Database from "metabase-lib/metadata/Database";
import type Table from "metabase-lib/metadata/Table";
import { SAVED_QUESTIONS_VIRTUAL_DB_ID } from "metabase-lib/metadata/utils/saved-questions";

import { appendSlug } from "./utils";

export function browseDatabase(database: Database) {
  const name =
    database.id === SAVED_QUESTIONS_VIRTUAL_DB_ID
      ? "Saved Questions"
      : database.name;

  return appendSlug(`/browse/databases/${database.id}`, slugg(name));
}

export function browseSchema(table: {
  db_id?: Table["db_id"];
  schema_name: Table["schema_name"] | null;
  db?: Pick<Database, "id">;
}) {
  const databaseId = table.db?.id || table.db_id;
  return `/browse/databases/${databaseId}/schema/${encodeURIComponent(
    table.schema_name ?? "",
  )}`;
}

export function browseTable(table: Table) {
  const databaseId = table.db?.id || table.db_id;
  return `/browse/databases/${databaseId}/schema/${table.schema_name}`;
}
