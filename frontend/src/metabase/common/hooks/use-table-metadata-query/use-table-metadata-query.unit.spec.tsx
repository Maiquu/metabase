import { setupDatabasesEndpoints } from "__support__/server-mocks";
import {
  renderWithProviders,
  screen,
  waitForLoaderToBeRemoved,
} from "__support__/ui";
import LoadingAndErrorWrapper from "metabase/components/LoadingAndErrorWrapper";
import { createMockDatabase, createMockTable } from "metabase-types/api/mocks";

import { useTableMetadataQuery } from "./use-table-metadata-query";

const TEST_TABLE = createMockTable();
const TEST_DATABASE = createMockDatabase({ tables: [TEST_TABLE] });

const TestComponent = () => {
  const { data, isLoading, error } = useTableMetadataQuery({
    id: TEST_TABLE.id,
  });

  if (isLoading || error || !data) {
    return <LoadingAndErrorWrapper loading={isLoading} error={error} />;
  }

  return <div>{data.name}</div>;
};

const setup = () => {
  setupDatabasesEndpoints([TEST_DATABASE]);
  renderWithProviders(<TestComponent />);
};

describe("useTableQuery", () => {
  it("should be initially loading", () => {
    setup();
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("should show data from the response", async () => {
    setup();
    await waitForLoaderToBeRemoved();
    expect(screen.getByText(TEST_TABLE.name)).toBeInTheDocument();
  });
});
