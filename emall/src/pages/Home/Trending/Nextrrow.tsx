import "../Home.css"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Nextrrow = (props: { className: any; style: any; onClick: any; }) => {
  
    const { className, style, onClick } = props;
    return (
  
      <div
        className={className }
        style={{ ...style, display: "block", background: "#778899", borderRadius:"50%",  }}
        onClick={onClick}


      />


    );
}

export default Nextrrow