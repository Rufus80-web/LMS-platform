import {} from 'react'
// import image from '../../../assets/images/money.png'
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material'

type MaterialCardProps = {
    userName: string,
}

const MaterialCard = ({userName}: MaterialCardProps) => {
  return (
    <Card sx={{maxWidth: 345, margin: 2, backgroundColor:'#fff', position:'absolute', left:'35rem', top:'10rem'}}>
       {/* <CardMedia component="img" style={{width:'30px', height:'30px', borderRadius:'0%'}} image={image} /> */}
       <CardContent>
         <Typography gutterBottom variant='h5' component="div">Warning !!!</Typography>
         <Typography gutterBottom variant='body2' color='text.secondary'>Are you sure you want to delete {userName}? This process is irreversible. If you decide to cancel this action click right button below </Typography>
         <CardActions>
            <Button size='small' variant='contained'>Delete</Button>
            <Button size='small' style={{backgroundColor:'red', color:'#fff'}}>Cancel</Button>
         </CardActions>
       </CardContent>
    </Card>
  )
}

export default MaterialCard