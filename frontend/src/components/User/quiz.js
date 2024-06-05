// src/components/QuizDashboard.js
import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import QuizTitleModal from './QuizTitleModal';
import { FaCheckSquare, FaAlignLeft, FaPencilAlt, FaVideo, FaPoll, FaSortAmountUp, FaArrowsAlt, FaMapMarkerAlt, FaTags, FaChartPie, FaEdit, FaMicrophone, FaCloud, FaRulerCombined, FaSquareRootAlt } from 'react-icons/fa';

const StyledContainer = styled(Container)`
  margin-top: 20px;
`;

const QuestionTypes = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const QuestionButton = styled(Button)`
  flex: 0 0 48%;
  margin-right: 4%;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: start;

  &:nth-child(2n) {
    margin-right: 0;
  }

  i {
    margin-right: 8px;
  }
`;

const Preview = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
`;

const CategoryTitle = styled.h5`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 1rem;
`;

const QuizDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [quizTitle, setQuizTitle] = useState('Quiz bez tytułu');
  const [previewQuestion, setPreviewQuestion] = useState(null);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const questionCategories = [
    {
      category: 'Odpowiedzi otwarte',
      types: [
        { icon: <FaPencilAlt color="#5b9bd5" />, text: 'Rysuj', preview: 'Podgląd Rysuj' },
        { icon: <FaVideo color="#ffc000" />, text: 'Odpowiedź wideo', preview: 'Podgląd Odpowiedź wideo' },
        { icon: <FaPoll color="#4472c4" />, text: 'Ankieta', preview: 'Podgląd Ankieta' },
        { icon: <FaAlignLeft color="#4472c4" />, text: 'Otwarty', preview: 'Podgląd Otwarty' },
        { icon: <FaMicrophone color="#4472c4" />, text: 'Odpowiedź dźwiękowa', preview: 'Podgląd Odpowiedź dźwiękowa' },
        { icon: <FaCloud color="#4472c4" />, text: 'Chmura słów', preview: 'Podgląd Chmura słów' },
      ]
    },
    {
      category: 'Myślenie interaktywne/wyższego rzędu',
      types: [
        { icon: <FaSortAmountUp color="#70ad47" />, text: 'Dopasuj', preview: 'Podgląd Dopasuj' },
        { icon: <FaArrowsAlt color="#70ad47" />, text: 'Przeciągnij i upuść', preview: 'Podgląd Przeciągnij i upuść' },
        { icon: <FaMapMarkerAlt color="#70ad47" />, text: 'Hotspot', preview: 'Podgląd Hotspot' },
        { icon: <FaTags color="#70ad47" />, text: 'Kategoryzować', preview: 'Podgląd Kategoryzować' },
        { icon: <FaSortAmountUp color="#70ad47" />, text: 'Zmień kolejność', preview: 'Podgląd Zmień kolejność' },
        { icon: <FaArrowsAlt color="#70ad47" />, text: 'Upuścić', preview: 'Podgląd Upuścić' },
        { icon: <FaTags color="#70ad47" />, text: 'Etykietowanie', preview: 'Podgląd Etykietowanie' },
      ]
    },
    {
      category: 'Matematyka',
      types: [
        { icon: <FaRulerCombined color="#ffc000" />, text: 'Odpowiedź matematyczna', preview: 'Podgląd Odpowiedź matematyczna' },
        { icon: <FaChartPie color="#ed7d31" />, text: 'Wykresy', preview: 'Podgląd Wykresy' },
      ]
    }
  ];

  return (
    <StyledContainer>
      <Row>
        <Col>
          <h1>{quizTitle}</h1>
          <Button variant="primary" onClick={handleShow}>
            Ustaw tytuł
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <Form.Group controlId="formQuizTitle">
            <Form.Label>Wpisz nazwę tematu</Form.Label>
            <Form.Control type="text" placeholder="Wpisz nazwę tematu" />
          </Form.Group>
          <h3>Dodaj nowe pytanie</h3>
          {questionCategories.map((category, index) => (
            <div key={index}>
              <CategoryTitle>{category.category}</CategoryTitle>
              <QuestionTypes>
                {category.types.map((type, typeIndex) => (
                  <QuestionButton
                    variant="outline-secondary"
                    key={typeIndex}
                    onMouseEnter={() => setPreviewQuestion(type.preview)}
                    onMouseLeave={() => setPreviewQuestion(null)}
                  >
                    {type.icon} {type.text}
                  </QuestionButton>
                ))}
              </QuestionTypes>
            </div>
          ))}
        </Col>
        <Col md={6}>
          <h3>Podgląd</h3>
          <Preview>
            {previewQuestion ? <p>{previewQuestion}</p> : <p>Wybierz typ pytania, aby zobaczyć podgląd</p>}
          </Preview>
        </Col>
      </Row>
      <QuizTitleModal
        show={showModal}
        handleClose={handleClose}
        setTitle={setQuizTitle}
      />
    </StyledContainer>
  );
};

export default QuizDashboard;
