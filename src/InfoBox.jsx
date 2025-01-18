import "./InfoBox.css";

export default function InfoBox({info}) {
    const HOT_URL = "https://advancepainting.com.au/wp-content/uploads/sunshine.png";
    const MIST_URL = "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?cs=srgb&dl=pexels-lum3n-44775-167699.jpg&fm=jpg";
    const COLD_URL = "https://www.shutterstock.com/image-photo/winter-forest-south-park-sofia-600nw-2483073899.jpg";

    return (
        <div className="infoBox">
            <div className="weather-card">
                <div className="image-section">
                    <img src={
                        info.temp > 20 ? HOT_URL : info.temp < 10 ? COLD_URL : MIST_URL
                    } 
                    alt="weather icon" />
                </div>
                <div className="info-section">
                    <h2 className="city-name">{info.city}</h2>
                    <div className="weather-details">
                        <p>Temperature = {info.temp}°C</p>
                        <p>Humidity = {info.humidity}</p>
                        <p>Min Temp = {info.tempMin}°C</p>
                        <p>Max Temp = {info.tempMax}°C</p>
                        <p>The weather can be described as <i>{info.weather}</i> feels Like {info.feelsLike}°C</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import "./InfoBox.css";

// export default function InfoBox({info}) {
//     const INIT_URL = "https://www.weatherbit.io/static/img/icons/t01d.png";

//     return (
//         <div className="infoBox">
            
//             <div className='card'>
//                 <Card sx={{ maxWidth: 345 }}>

//                     <CardMedia
//                         component="img"
//                         height="140"
//                         image={INIT_URL}
//                         alt="green iguana"
//                     />
//                     <CardContent>
//                         <Typography gutterBottom variant="h5" component="div">
//                             {info.city}
//                         </Typography>
//                         <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
//                             <p>Temperature = {info.temp}&deg;C</p>
//                             <p>Humidity = {info.humidity}</p>
//                             <p>Min Temp = {info.tempMin}&deg;C</p>
//                             <p>Max Temp = {info.tempMax}&deg;C</p>
//                             <p>The weather can be described as <i>{info.weather}</i> feels Like {info.feelsLike}&deg;C</p>
//                         </Typography>
//                     </CardContent>

//                 </Card>
//             </div>
//         </div>
//     );
// }