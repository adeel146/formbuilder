import { FC } from "react";

const Header: FC = () => {
  return (
    <div className="h-12 relative z-10 w-full bg-white shadow-md flex justify-center items-center">
      <h3 className="font-sans font-semibold mb-0 text-xl">Form Builder</h3>
    </div>
  );
};

export default Header;
