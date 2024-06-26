import { SAMPLE_DB_ID } from "e2e/support/cypress_data";
import { SAMPLE_DATABASE } from "e2e/support/cypress_sample_database";
import {
  restore,
  popover,
  filterWidget,
  visitQuestionAdhoc,
} from "e2e/support/helpers";

import * as SQLFilter from "../helpers/e2e-sql-filter-helpers";

const { PRODUCTS } = SAMPLE_DATABASE;

const filter = {
  id: "d98c3875-e0f1-9270-d36a-5b729eef938e",
  name: "category",
  "display-name": "Category",
  type: "dimension",
  dimension: ["field", PRODUCTS.CATEGORY, null],
  "widget-type": "category",
  default: null,
};

const questionQuery = {
  dataset_query: {
    database: SAMPLE_DB_ID,
    native: {
      query:
        "select p.created_at, products.category\nfrom products\nleft join products p on p.id=products.id\nwhere {{category}}\n",
      "template-tags": {
        category: filter,
      },
    },
    type: "native",
  },
};

describe("issue 15460", () => {
  beforeEach(() => {
    restore();
    cy.signInAsAdmin();

    visitQuestionAdhoc(questionQuery);
  });

  it("should be possible to use field filter on a query with joins where tables have similar columns (metabase#15460)", () => {
    // Set the filter value by picking the value from the dropdown
    filterWidget().contains(filter["display-name"]).click();

    popover().within(() => {
      cy.findByText("Doohickey").click();
      cy.button("Add filter").click();
    });

    SQLFilter.runQuery();

    cy.get(".Visualization").within(() => {
      cy.findAllByText("Doohickey");
      cy.findAllByText("Gizmo").should("not.exist");
    });
  });
});
