import { useNavigate } from "react-router-dom";
import ROUTES from "../../Routes";

function GNB() {
  const navigate = useNavigate();

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
      }}
    >
      <h1 style={{ margin: 0 }}>
        <button
          type="button"
          onClick={() => navigate(ROUTES.DIARY_LIST)}
          style={{
            background: "none",
            border: "none",
            fontSize: 20,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Diing
        </button>
      </h1>

      <nav style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          type="button"
          onClick={() => navigate(ROUTES.MY_PAGE)}
          style={{
            background: "none",
            border: "none",
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          👤
        </button>

        <button
          type="button"
          onClick={() => alert("준비중!")}
          style={{
            background: "none",
            border: "none",
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          🗃️
        </button>
      </nav>
    </header>
  );
}

export default GNB;
