import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../services/travelheadsAPI";
import UserOptMenu from "./UserOptMenu";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

export default function Header() {
    const [ userName, setUserName ] = useState("");
    const [ userImg, setUserImg ] = useState("");
    const [ showUserOpt, setShowUserOpt ] = useState(false);
    console.log(showUserOpt)
    const navigate = useNavigate();

    useEffect(() => {
        
        async function fetchData() {
            try {
                const user = await getUserById();
                setUserName(user.data.name);
                setUserImg(user.data.img);
            } catch (error) {
                setUserName("Anônimo");
                setUserImg("http://www.meupositivo.com.br/doseujeito/wp-content/uploads/2020/02/navegacao-em-modo-anonimo.jpg")
            }
        }

        fetchData()
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky">
                <Toolbar sx={{alignItems: "center"}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setShowUserOpt(!showUserOpt)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" component="h1" onClick={() => navigate("/home")} sx={{ flexGrow: 1 }}>
                        TravelHeads
                    </Typography>
                <Stack direction="row" spacing={2} alignItems="center" divider={<Divider orientation="vertical" flexItem />}>
                    <Typography variant="h6" align="justify">{userName}</Typography>
                    <Avatar alt={userName} src={userImg} sx={{ width: 48, height: 48 }}/>
                </Stack>
            </Toolbar>
            {showUserOpt && <UserOptMenu setShowUserOpt={setShowUserOpt}/>}
            </AppBar>
        </Box>
    )
}
