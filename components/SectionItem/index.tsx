import { RepositorySectionItem } from "./RepositorySectionItem";
import { IssueSectionItem } from "./IssueSectionItem";
import { UserSectionItem } from "./UserSectionItem";

export const SectionItem = ({
  section,
  item,
  index,
}: {
  section: { title: string; count: number };
  item: unknown;
  index: number;
}) => {
  if (section.title === "Repositories") {
    return (
      <RepositorySectionItem
        item={item}
        index={index}
        repositoryCount={section.count}
      />
    );
  }

  if (section.title === "Issues") {
    return (
      <IssueSectionItem item={item} index={index} issueCount={section.count} />
    );
  }

  if (section.title === "Users") {
    return (
      <UserSectionItem item={item} index={index} userCount={section.count} />
    );
  }

  return null;
};
