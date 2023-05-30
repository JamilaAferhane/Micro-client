import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { FC } from "react";
import Post from "./Post";
import HoverRating from "../rating";

type Props = { reviews: string[] };

const Reviews: FC<Props> = ({ reviews }) => (
  <Grid container spacing={4}>
    <Grid item sx={{ mr: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Give your feedback
      </Typography>

      <HoverRating />

      <TextField fullWidth sx={{ mb: 2, mt: 2, wordWrap: "wrap" }} />
      <Button type="submit" variant="outlined">
        Submit
      </Button>
    </Grid>
    <Grid item>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {reviews.map((review) => (
          <Box key={review}>
            <Post
              review={review}
              user={{ name: "riad", username: "riad@gmail.com" }}
            />
            <Divider variant="inset" component="li" sx={{ mb: 2, mt: 2 }} />
          </Box>
        ))}
      </List>
    </Grid>
  </Grid>
);
export default Reviews;
