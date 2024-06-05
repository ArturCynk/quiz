// src/components/QuizTitleModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styled from 'styled-components';

const CoverImage = styled.img`
  width: 100%;
  margin-top: 10px;
`;

const QuizTitleModal = ({ show, handleClose, setTitle }) => {
  const [title, setTitleState] = useState('');
  const [visibility, setVisibility] = useState('Widoczne publicznie');
  const [coverImage, setCoverImage] = useState(null);

  const handleSave = () => {
    setTitle(title);
    handleClose();
  };

  const handleImageChange = (e) => {
    setCoverImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ustawienia quizu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formQuizTitle">
          <Form.Label>Nazwa</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wpisz nazwę quizu"
            value={title}
            onChange={(e) => setTitleState(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formQuizVisibility">
          <Form.Label>Widoczność</Form.Label>
          <Form.Control
            as="select"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option>Widoczne publicznie</option>
            <option>Prywatne</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formQuizCover">
          <Form.Label>Dodaj zdjęcie na okładkę</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
          {coverImage && <CoverImage src={coverImage} alt="Cover" />}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Zamknij
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Zapisz
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuizTitleModal;