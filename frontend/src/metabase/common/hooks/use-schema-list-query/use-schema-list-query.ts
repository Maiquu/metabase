import type {
  UseEntityListQueryProps,
  UseEntityListQueryResult,
} from "metabase/common/hooks/use-entity-list-query";
import { useEntityListQuery } from "metabase/common/hooks/use-entity-list-query";
import Schemas from "metabase/entities/schemas";
import type Schema from "metabase-lib/metadata/Schema";
import type { SchemaListQuery } from "metabase-types/api";

export const useSchemaListQuery = (
  props: UseEntityListQueryProps<SchemaListQuery> = {},
): UseEntityListQueryResult<Schema> => {
  return useEntityListQuery(props, {
    fetchList: Schemas.actions.fetchList,
    getList: Schemas.selectors.getList,
    getLoading: Schemas.selectors.getLoading,
    getLoaded: Schemas.selectors.getLoaded,
    getError: Schemas.selectors.getError,
    getListMetadata: Schemas.selectors.getListMetadata,
  });
};
