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
