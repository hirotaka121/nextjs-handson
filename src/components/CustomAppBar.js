import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled, alpha, responsiveFontSizes } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

// const onSearchClick = async () => {
//   const data = await fetchData(keyword);

//   setShops(data);
//   setKeyword('');
// };

const CustomAppBar = ({ value, onChange, onClick }) => {
  const [keyword, setKeyword] = React.useState(value);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{ fontFamily: 'メイリオ', fontWeight: 'bold', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          ガチマヤー
        </Typography>
        <Grid>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="検索"
              inputProps={{ 'aria-label': 'search' }}
              value={keyword}
              onChange={(event) => {
                onChange(event.target.value);
                setKeyword(event.target.value);
              }}
              onKeyDown={(event) => {
                console.log('event', event);
                if (event.key === 'Enter') {
                  onClick();
                  event.preventDefault();
                }
              }}
            />
          </Search>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
