import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const Post = ({ user, review }: { user: any; review: string }) => (
  <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Avatar alt={user?.name} src="/static/images/avatar/3.jpg" />
    </ListItemAvatar>
    <ListItemText
      primary={user?.username}
      secondary={
        <Typography
          sx={{ display: "inline" }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          {review}
        </Typography>
      }
    />
  </ListItem>
);

export default Post;
