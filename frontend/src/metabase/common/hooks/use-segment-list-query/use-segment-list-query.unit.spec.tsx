import { setupSegmentsEndpoints } from "__support__/server-mocks";
import {
  renderWithProviders,
  screen,
  waitForLoaderToBeRemoved,
  within,
} from "__support__/ui";
import LoadingAndErrorWrapper from "metabase/components/LoadingAndErrorWrapper";
import { createMockSegment } from "metabase-types/api/mocks";

import { useSegmentListQuery } from "./use-segment-list-query";

const TEST_SEGMENT = createMockSegment();

const TestComponent = () => {
  const { data = [], metadata, isLoading, error } = useSegmentListQuery();

  if (isLoading || error) {
    return <LoadingAndErrorWrapper loading={isLoading} error={error} />;
  }

  return (
    <div>
      {data.map(segment => (
        <div key={segment.id}>{segment.name}</div>
      ))}

      <div data-testid="metadata">
        {(!metadata || Object.keys(metadata).length === 0) && "No metadata"}
      </div>
    </div>
  );
};

const setup = () => {
  setupSegmentsEndpoints([TEST_SEGMENT]);
  renderWithProviders(<TestComponent />);
};

describe("useSegmentListQuery", () => {
  it("should be initially loading", () => {
    setup();
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("should show data from the response", async () => {
    setup();
    await waitForLoaderToBeRemoved();
    expect(screen.getByText(TEST_SEGMENT.name)).toBeInTheDocument();
  });

  it("should not have any metadata in the response", async () => {
    setup();
    await waitForLoaderToBeRemoved();
    expect(
      within(screen.getByTestId("metadata")).getByText("No metadata"),
    ).toBeInTheDocument();
  });
});
