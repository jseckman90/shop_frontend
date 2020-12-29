import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const OrderItem = (props) => {
  const { product, handleDelete } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
  }));

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar src="/logo.png" className={classes.avatar} />}
        title={product.name}
        subheader={product.price}
      />
      <CardMedia
        className={classes.media}
        image={product.img}
        title="Product"
      />

      <CardContent>
        <Typography
          variant="headline"
          color="textSecondary"
          component="p"></Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          <DeleteForeverIcon fontSize="large" />
        </Button>
      </CardActions>
    </Card>

    // <div>
    //   <div className="card" style={{ width: "18rem" }}>
    //     <img src={product.img} class="card-img-top" alt={product.name} />
    //     <div className="card-body">
    //       <h5 className="card-title">{product.name}</h5>
    //       <p className="card-text">{product.price}</p>
    //       <div
    //         className="btn btn-danger"
    //         onClick={() => handleDelete(product.id, product.order_id)}>
    //         <i class="fas fa-trash-alt"></i>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default OrderItem;
