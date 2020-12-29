import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Avatar from "@material-ui/core/Avatar";

import Typography from "@material-ui/core/Typography";

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
          <DeleteForeverIcon
            fontSize="large"
            onClick={() => handleDelete(product.id, product.order_id)}
          />
        </Button>
      </CardActions>
    </Card>
  );
};

export default OrderItem;
