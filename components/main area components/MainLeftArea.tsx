import Section from "components/leftarea_/main/Section";
import { useSections } from "components/states/global.state";
import { FC } from "react";

const MainLeftArea: FC = () => {
  const { sections } = useSections();
  return (
    <div className="m-4 rounded-md shadow-sm bg-white">
      {sections.map((section) => (
        <Section key={section.id} {...section} />
      ))}
    </div>
  );
};

export default MainLeftArea;
