import { FC } from "react";
import StarRating from "components/main area components/ReactSvgStarRating/StarRating";
import { useEffectOnce } from "react-use";

interface IDefaultValueStarRatingComponent {
  value: any;
  setValue: (str: any) => any;
}

const DefaultValueStarRatingComponent: FC<IDefaultValueStarRatingComponent> = ({
  value,
  setValue,
}) => {
  useEffectOnce(() => {
    setValue(value ?? 0);
  });
  return (
    <>
      <StarRating
        initialRating={value ?? 0}
        handleOnClick={(rating) => setValue(rating)}
        size={24}
        containerClassName="flex"
      />
    </>
  );
};

export default DefaultValueStarRatingComponent;
