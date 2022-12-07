
type TStandButtonProps = {
    handleClick: () => JSX.Element | undefined
}
export const StandButton = ({handleClick}: TStandButtonProps ) =>{
    return <button onClick={handleClick}>Stand</button>
}