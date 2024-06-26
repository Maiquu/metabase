import { color } from "metabase/lib/colors";
import { createEntity } from "metabase/lib/entities";
import * as Urls from "metabase/lib/urls";
import { SegmentSchema } from "metabase/schema";
import { getMetadata } from "metabase/selectors/metadata";

const Segments = createEntity({
  name: "segments",
  nameOne: "segment",
  path: "/api/segment",
  schema: SegmentSchema,

  objectActions: {
    setArchived: (
      { id },
      archived,
      { revision_message = archived ? "(Archive)" : "(Unarchive)" } = {},
    ) => Segments.actions.update({ id }, { archived, revision_message }),

    // NOTE: DELETE not currently implemented
    delete: null,
  },

  selectors: {
    getObject: (state, { entityId }) => getMetadata(state).segment(entityId),
  },

  objectSelectors: {
    getName: segment => segment && segment.name,
    getUrl: segment =>
      Urls.tableRowsQuery(
        segment.database_id,
        segment.table_id,
        null,
        segment.id,
      ),
    getColor: segment => color("filter"),
    getIcon: segment => ({ name: "segment" }),
  },

  form: {
    fields: [{ name: "name" }, { name: "description", type: "text" }],
  },
});

export default Segments;
