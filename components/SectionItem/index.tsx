import { RepositorySectionItem } from "./RepositorySectionItem";
import { IssueSectionItem } from "./IssueSectionItem";
import { UserSectionItem } from "./UserSectionItem";

export const SectionItem = ({
  section,
  item,
  index,
}: {
  section: { title: string };
  item: unknown;
  index: number;
}) => {
  if (section.title === "Repositories") {
    return <RepositorySectionItem item={item} index={index} />;
  }

  if (section.title === "Issues") {
    return <IssueSectionItem item={item} index={index} />;
  }

  if (section.title === "Users") {
    return <UserSectionItem item={item} index={index} />;
  }

  return null;
};
