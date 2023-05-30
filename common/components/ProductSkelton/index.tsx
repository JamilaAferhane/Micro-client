import { Box, Grid, Skeleton } from "@mui/material";

function ProductSkelton() {
  return (
    <Box sx={{ border: "1px solid #eee", p: 1 }}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        color="secondary"
        sx={{
          p: { xs: 1, md: 2 },
          // width: {
          //   xs: 200,
          //   md: 'auto',
          // },
          mb: 0.5,
          height: { xs: 200, md: 244 },
          cursor: "pointer",
        }}
      />
      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          color: "#000",
          fontSize: { xs: 14, md: 17 },
          width: "70%",
          height: { md: 25, xs: 22 },

          mt: { md: -0.4, xs: -0.5 },
        }}
      />{" "}
      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          mt: { md: -2, xs: -1.3 },
          color: "#000",
          fontSize: { xs: 14, md: 17 },
          height: { md: 70, xs: 44 },
          width: {
            xs: 200,
            md: "auto",
          },
        }}
      />
      <Grid sx={{ alignItems: "center", pb: 2, gap: 3, pl: 1 }} container>
        <Grid md={4.5} item>
          <Skeleton
            variant="rectangular"
            animation="wave"
            color="secondary"
            sx={{
              width: {
                xs: 50,
                md: "auto",
              },
              height: { md: 20, xs: 19 },
            }}
          />
        </Grid>
        <Grid md={3.2} item>
          <Skeleton
            variant="rectangular"
            animation="wave"
            color="secondary"
            sx={{
              width: {
                xs: 50,
                md: "auto",
              },
              height: { md: 20, xs: 19 },
            }}
          />
        </Grid>
        <Grid item>
          <Skeleton variant="rectangular" animation="wave" color="secondary" />
        </Grid>
      </Grid>
    </Box>
  );
}
export default ProductSkelton;
