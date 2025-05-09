import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Link } from "react-router";

export default function OrdersPage() {
  return (
    <>
      <Typography>Welcome to the Toolpad orders!</Typography>
      <Button component={Link} to="abc">
        test
      </Button>
    </>
  );
}
