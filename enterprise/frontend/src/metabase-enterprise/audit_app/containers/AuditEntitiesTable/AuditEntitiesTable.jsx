import PropTypes from "prop-types";
import { usePrevious } from "react-use";
import _ from "underscore";

import AuditTableWithSearch from "../AuditTableWithSearch";

const propTypes = {
  entities: PropTypes.array,
};

export const AuditEntitiesTable = ({ entities, ...rest }) => {
  const previousEntities = usePrevious(entities);

  const shouldReload =
    previousEntities?.length === entities?.length &&
    !_.isEqual(previousEntities, entities);

  return <AuditTableWithSearch {...rest} reload={shouldReload} />;
};

AuditEntitiesTable.propTypes = propTypes;
