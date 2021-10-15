import React from 'react';
import Konami from 'react-konami-code';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog'
import Button from 'react-bootstrap/Modal';
import { useState} from 'react';
import style from './cheugy.css';

export default class Cheugy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showVideo : false
    }
  };

  render = () => (
    <>
      <Konami action={() => this.setState({showVideo: true})}/>
      <Modal show={this.state.showVideo} onHide={() => this.setState({showVideo: false})}>
          <Modal.Header closeButton>
              <Modal.Title>Cheugy!</Modal.Title>
          </Modal.Header>
          <Modal.Body><iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>Close</Button>
              <Button variant="primary">Save Changes</Button>
          </Modal.Footer>
      </Modal>
    </>
  )
}


class Video extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        show: true
    };
    
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleClose (){
    this.setState({ show: false });
  };

  handleShow (){
    this.setState({ show: true });
    alert(this.handleShow);
  };

  render() {
    return(
        <div>
            <Button variant="primary" onClick={this.handleShow}>Launch modal</Button>
        </div>
    );
  }
}