import { useNavigate } from "react-router-dom"
import { Box, Paper, Typography } from '@mui/material';

export default function CityCard({city}) {
    const navigate = useNavigate();

    return (
            <Paper 
                className="cityCard" 
                elevation={5}
                onClick={() => navigate(`/cityPage/${city.id}`)}
                sx={{width:'200px', height:'150px'}}
            >
                <img src={city.img} alt={city.name} height="100px" width="100%" object-fit="cover"/>
                <Box paddingX={1}>
                    <Typography variant="h5" component="h6">
                        {city.name}
                    </Typography>
                    <Typography variant="h6" component="h6">
                        {city.country}
                    </Typography>
                </Box>
            </Paper>
    )
}

