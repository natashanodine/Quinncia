import React,{Component}  from 'react';
import axios from 'axios';


class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {photo: '',imagePreviewUrl: ''};
  }

  _handleSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:3000/api/photo/', this.state.photo)
    console.log('handle uploading-', this.state.photo);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let photo = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        photo: photo,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(photo)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput" 
            type="file" 
            onChange={(e)=>this._handleImageChange(e)} />
          <button className="submitButton" 
            type="submit" 
            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}
  

export default ImageUpload;