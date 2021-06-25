import "./square.css"

export const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick} data-e2e="square">
      {props.value}
    </button>
  );
};
