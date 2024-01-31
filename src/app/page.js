import { Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/dashboard">
        <Button
          fullWidth
          size="large"
          sx={{
            mt: 3,
            backgroundColor: "#6366F1!important", // Initial background color
            "&:hover": {
              backgroundColor: "#6366F1", // Color on hover
            },
          }}
          type="submit"
          variant="contained"
        >
          Go To Admin Panel!
        </Button>
      </Link>
    </main>
  );
}
