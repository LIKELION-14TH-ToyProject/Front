
const Card = ({children}) => {
    return(
        <section
        style={{
        border: "1px solid #aaaaaa",
        borderRadius: "12px",
        padding: "20px",
        margin: "10px 0",
        backgroundColor: "#ffffff"}}>
            <p>cards</p>
            <div>{children}</div>
        </section>

    );

}

export default Card;