import type Question from "metabase-lib/Question";
import type Database from "metabase-lib/metadata/Database";
import type { WritebackAction } from "metabase-types/api";

export const canRunAction = (
  action: WritebackAction,
  databases: Database[],
) => {
  const database = databases.find(({ id }) => id === action.database_id);
  return database != null && database.hasActionsEnabled();
};

export const canEditAction = (action: WritebackAction, model: Question) => {
  if (action.model_id !== model.id()) {
    return false;
  }

  return model.canWriteActions();
};

export const canArchiveAction = (action: WritebackAction, model: Question) => {
  if (action.model_id !== model.id()) {
    return false;
  }

  return action.type !== "implicit" && canEditAction(action, model);
};
