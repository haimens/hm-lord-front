import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import request from './request'

const REACT_HAVANA_IMAGE_URL = process.env.REACT_APP_HAVANA_IMAGE_URL

class ImageUpload extends Component {
  state = {
    image: '',
    imageBase64: '',
    crop: {
      aspect: 1
    },
    showImage: false
  }

  handleOnChangeCrop = (crop) => {
    //crop data is stored as percentage
    this.setState({ crop })
  }

  handleImageUpload = async (e) => {
    e.preventDefault()
    try {
      const imageFileList = e.target.files
      if (imageFileList.length === 0) { return }
      const imageBase64 = await this.getBaseUrl(imageFileList[0])
      this.setState({
        ...this.state, image: imageFileList[0], showImage: true, imageBase64
      })
    } catch (err) {
      throw err;
    }

  }

  generateCropImage = (image, pixelCrop, fileName) => {
    const canvas = document.createElement('canvas');
    const length = Number(image.clientWidth) * Number(pixelCrop.width) * 0.017
    const posX = Number(image.clientWidth) * Number(pixelCrop.x) * 0.01
    const posY = Number(image.clientHeight) * Number(pixelCrop.y) * 0.01
    canvas.width = length;
    canvas.height = length;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      image,
      posX,
      posY,
      length, length,
      0, 0,
      length, length
    );
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        blob.name = fileName;
        resolve(blob);
      }, 'image/jpeg', 0.2);
    });

  }

  uploadImage = async (e) => {
    e.preventDefault()
    try {

      // process image
      const formData = new FormData()
      const mImage = !!this.state.crop.width && this.props.imageProcessMode
        ? await this.generateCropImage(this.imageNode.imageRef, this.state.crop, this.state.image.name)
        : this.state.image
      formData.append('image', mImage)
      // check acceptable data types
      const acceptedDataTypes = ['logo', 'avatar', 'icon']
      const isAcceptedDataTypes = acceptedDataTypes.includes(this.props.data_type)
      if (!isAcceptedDataTypes) { throw new Error('NOT A ACCEPTED DATA TYPE') }
      const imageResult = await request('POST', REACT_HAVANA_IMAGE_URL, `api/v0/${this.props.data_type}/file`, formData, {
        app_token: this.props.app_token,
        app_key: this.props.app_key
      })

      // send image data to props
      this.props.onImageUpload(imageResult.payload)
    } catch (err) {
      throw err;
    }
  }

  getBaseUrl = (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  render() {
    // containerCLassName, inputGroupClassName, inputLabelClassName, inputClassName, uploadBtnClassName
    return (
      <main className={this.props.containerClassName || ''}>
        <section className={this.props.btnControlClassName}>
          <div style={{ width: '200px', ...styles.inputGroup }} className={this.props.inputGroupClassName || ''}>
            <section className={this.props.inputLabelClassName || ''} style={styles.inputLabel}>
              {this.props.label && <label>{this.props.label}</label>}
            </section>
            <input
              className={this.props.inputClassName || ''}
              type='file'
              onChange={this.handleImageUpload}
              accept='image/png, image/jpeg'
            />
          </div>
          <div style={styles.inputGroup} className={this.props.inputGroupClassName || ''}>
            <button
              onClick={this.uploadImage}
              style={styles.uploadBtn}
              className={this.props.uploadBtnClassName || ''}
              disabled={!this.state.image}
            >upload</button>
          </div>
        </section>
        <section className={this.props.imageContainerClassName}>
          {
            (this.state.showImage && this.props.imageProcessMode)
              ? <ReactCrop
                ref={ref => (this.imageNode = ref)}
                src={this.state.imageBase64}
                crop={this.state.crop}
                onChange={this.handleOnChangeCrop}
              />
              : <img src={`${process.env.PUBLIC_URL}/img/avatar_placeholder.png`} width='100%' />

          }
        </section>


      </main>
    );
  }
}

export default ImageUpload;

const styles = {
  uploadBtn: {
    padding: '6px 12px',
    border: '1px solid #8e8e8e33',
    borderRadius: '5px',
    minWidth: '78px',
    fontWeight: 'bold'
  },
  inputGroup: {
    padding: '10px'
  },
  inputLabel: {
    fontWeight: 'bold',
    padding: '5px 0px'
  }
}
