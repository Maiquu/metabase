import { t } from "ttag";

import { SectionHeader } from "metabase/admin/settings/components/SettingsLicense";
import { getStoreUrl } from "metabase/selectors/settings";
import { Text } from "metabase/ui";

import { StoreButtonLink } from "./BillingInfo.styled";

export const BillingGoToStore = () => {
  const url = getStoreUrl();

  return (
    <>
      <SectionHeader>{t`Billing`}</SectionHeader>
      <Text color="text-md">{t`Manage your Cloud account, including billing preferences, in your Metabase Store account.`}</Text>
      <StoreButtonLink href={url}>
        {t`Go to the Metabase Store`}
      </StoreButtonLink>
    </>
  );
};
