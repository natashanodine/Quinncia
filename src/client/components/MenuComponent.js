import React  from 'react';
import { Card,CardImg,CardImgOverlay,CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';


    function RenderMenuItem({photo , onClick }){
        return(
            <Card>
                <Link to={`/photo/${photo.id}`} >
					
                    <CardImg width="100%" src={'http://localhost:3000/api/photo' + photo.image} alt={photo.id} />
                </Link>
            </Card>
        );
    }



    const Menu = (props) => {
        const menu = props.photos.photos.map((photo) => {
            return (
              <div key={photo.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem photo={photo} />
              </div>
            );
        });

        if(props.photos.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.photos.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.photos.errMess}</h4>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div className="container">
                    <div className="row">
                       
                        <div className="col-12">
                            <h3>Photos</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        {menu}
                    </div>
                </div>
            );
        }
    }

export default Menu;
