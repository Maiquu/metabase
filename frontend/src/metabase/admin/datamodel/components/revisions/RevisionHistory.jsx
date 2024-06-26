/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { Component } from "react";
import { t } from "ttag";

import Breadcrumbs from "metabase/components/Breadcrumbs";
import LoadingAndErrorWrapper from "metabase/components/LoadingAndErrorWrapper";
import Tables from "metabase/entities/tables";
import { assignUserColors } from "metabase/lib/formatting";

import Revision from "./Revision";

class RevisionHistory extends Component {
  static propTypes = {
    object: PropTypes.object,
    revisions: PropTypes.array,
    table: PropTypes.object,
  };

  render() {
    const { object, objectType, revisions, table, user } = this.props;

    let userColorAssignments = {};
    if (revisions) {
      userColorAssignments = assignUserColors(
        revisions.map(r => r.user.id),
        user.id,
      );
    }

    return (
      <LoadingAndErrorWrapper loading={!object || !revisions}>
        {() => (
          <div className="wrapper">
            <Breadcrumbs
              className="py4"
              crumbs={[
                objectType === "segment"
                  ? [t`Segments`, `/admin/datamodel/segments?table=${table.id}`]
                  : [t`Metrics`, `/admin/datamodel/metrics?table=${table.id}`],
                [this.props.objectType + t` History`],
              ]}
            />
            <div className="wrapper py4" style={{ maxWidth: 950 }}>
              <h2 className="mb4">
                {t`Revision History for`} &quot;{object.name}&quot;
              </h2>
              <ol>
                {revisions.map(revision => (
                  <Revision
                    key={revision.id}
                    revision={revision}
                    objectName={object.name}
                    currentUser={user}
                    tableMetadata={table}
                    userColor={userColorAssignments[revision.user.id]}
                  />
                ))}
              </ol>
            </div>
          </div>
        )}
      </LoadingAndErrorWrapper>
    );
  }
}

export default Tables.load({
  id: (state, { object: { table_id } }) => table_id,
})(RevisionHistory);
