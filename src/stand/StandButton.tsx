type TStandButtonProps = {
  handleClick: () => void;
};
export const StandButton = ({ handleClick }: TStandButtonProps) => {
  return <button onClick={handleClick}>Stand</button>;
};
