import {
  Grid2,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { SORTBY } from "../features/search/types";

const SortBy = ({
  sortValue,
  setSortValue,
}: {
  sortValue: string;
  setSortValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Grid2 container spacing={1} width={"100%"} textAlign="end">
      <Grid2 size={11}>
        <Typography variant="subtitle1" fontWeight="bold" color="primary">
          Sort by
        </Typography>
      </Grid2>

      <Grid2 size={1}>
        <FormControl variant="standard" color="primary">
          <Select
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
            disableUnderline
          >
            {SORTBY.map((cl) => (
              <MenuItem key={cl} value={cl}>
                {cl}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid2>
    </Grid2>
  );
};
export default SortBy;
