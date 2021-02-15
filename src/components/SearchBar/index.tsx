import SearchIcon from '@material-ui/icons/Search';
import { InputBase, CircularProgress } from "@material-ui/core";
import debounce from 'lodash/debounce';
import useStyles from './styles';

interface SearchBarProps {
  onChange: (event: any) => void;
  loading: boolean;
}

const SearchBar = ({ onChange, loading }: SearchBarProps) => {
  const classes = useStyles();
  const onChangeWithDebounce = debounce(onChange, 500);

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        { loading ? <CircularProgress size={20} /> : <SearchIcon/> }
      </div>
      <InputBase
        placeholder="Search for the bike points…"
        classes={{ root: classes.inputRoot, input: classes.inputInput }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={onChangeWithDebounce}
      />
    </div>
  );
}

export default SearchBar;
