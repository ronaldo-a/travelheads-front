import { useNavigate } from "react-router-dom"
import { Box, Paper, Typography } from '@mui/material';

export default function MyTravelCard({travel}) {
    const navigate = useNavigate();

    return (
        <Paper 
                className="cityCard" 
                elevation={5}
                onClick={() => navigate(`/travelPage/${travel.id}`)}
                sx={{width:'200px', height:'150px'}}
        >
            <img src={travel.img} alt={travel.name} height="100px" width="100%" object-fit="cover"/>
            <Box paddingX={1}>
            <Typography variant="h5" component="h6">
                {travel.name}
            </Typography>
            <Typography variant="h6" component="h6">
                {travel.cityName}
            </Typography>
            </Box>
        </Paper>
    )
}
