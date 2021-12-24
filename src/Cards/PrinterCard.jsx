import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PushPinIcon from "@mui/icons-material/PushPin";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PrinterCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOctoPrintClick = () => {
    window.open(props.octoPrintLink, "_blank");
  };

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: props.printerThemeColor }}
            aria-label={props.printerName}
          >
            {props.printerName.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.printerName}
        subheader={props.status}
      />
      <CardMedia component="img" image="/printer.png" alt="Printer" />
      <CardContent>
        <Button onClick={handleOctoPrintClick}>Local OctoPrint </Button>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <PushPinIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="details"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Server Version:</Typography>
          <Typography paragraph>Last Print Information:</Typography>
          <Typography paragraph>File Name:</Typography>
          <Typography paragraph>Time Elapsed:</Typography>
          <Typography paragraph>Status:</Typography>
          <Typography paragraph>Link to Download File:</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
