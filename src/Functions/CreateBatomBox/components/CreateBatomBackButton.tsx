import pinkArrow from "../../../assets/pink go back arrow.svg";

export type CreateBatomBackButtonProps = {
  isVisible: boolean;
  onBack: () => void;
};

function CreateBatomBackButton({ isVisible, onBack }: CreateBatomBackButtonProps) {
  if (!isVisible) return null;

  return <img src={pinkArrow} alt="" className="create-batom__back-button pink-go-back-arrow" onClick={onBack}  decoding="async"  loading="lazy" />;
}

export default CreateBatomBackButton;
