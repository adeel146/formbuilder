import Header from "./Header";
import Footer from "./Footer";
import { ISection } from "components/states/global.state";
import { FC } from "react";
import Rows from "./rows/Rows";
import SectionTable from "./table/SectionTable";

interface ISectionProps extends ISection {}

const Section: FC<ISectionProps> = ({ name, id, description, rows, type }) => {
  return (
    <div className="py-4">
      <Header id={id} name={name} description={description} />
      {type === "rows" ? (
        <Rows id={id} rows={rows} />
      ) : (
        <SectionTable id={id} row={rows[0]} />
      )}
      <Footer id={id} type={type} />
    </div>
  );
};

export default Section;
