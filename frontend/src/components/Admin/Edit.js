import { Link } from "react-router-dom";
import { myButton, Wrapper } from "../styles/Container.styled";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Edit = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("");

  const getAllproduct = () => {
    axios.get("/api/store/products").then((response) => {
      setProducts(response.data.products);
    });
  };

  useEffect(() => {
    getAllproduct();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("/api/store/products/" + id, {
        id: id,
      })
      .then((response) => {
        getAllproduct();
        if (response.status === 200) {
          setResponse(response.data);
          setOpen(true);
        }
      });
  };

  const handleEdit = () => null;

  return (
    <Wrapper>
      <>
        {open && (
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {response}
            </Alert>
          </Collapse>
        )}
        {products.map((product) => (
          <div className="product-preview" key={product.id}>
            <div className="item_card">
              <img
                src={product.image_url}
                alt={product.name}
                className="item_image"
              />
              <div className="edit-item">
                <span className="item_content">
                  <span className="item_name">{product.name}</span>
                  <span className="item_price_wrap">
                    <span className="price_dash"> - </span>
                    <span className="item_price"> $ {product.amount} CAD </span>
                  </span>
                </span>
                <div>
                  <Link to={`/product/${product.id}`}>
                    <Button>Edit Product</Button>
                  </Link>
                  <Button onClick={() => handleDelete(product.id)}>
                    Delete Product
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    </Wrapper>
  );
};

export default Edit;
