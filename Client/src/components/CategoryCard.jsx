const CategoryCard = ({ name, image }) => {
    return (
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "0.5rem",
        }}
        className="group"
      >
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "16rem", // h-64 equivalent
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
          className="group-hover:scale-105"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.3s ease",
          }}
          className="group-hover:bg-opacity-50"
        >
          <h3
            style={{
              color: "white",
              fontSize: "1.5rem", // text-2xl equivalent
              fontWeight: "bold",
              opacity: 0,
              transition: "opacity 0.3s ease",
            }}
            className="group-hover:opacity-100"
          >
            {name}
          </h3>
        </div>
      </div>
    );
  };