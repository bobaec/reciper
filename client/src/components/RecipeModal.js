import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styling/RecipeModal.scss';

const RecipeModal = ({ show, setShow, recipe }) => {
  const { image, summary, sourceUrl, title, id, likes, missedIngredients, usedIngredients } = recipe;
  const [recipeInformation, setRecipeInformation] = useState({});
  useEffect(() => {
    const getRecipeInformation = async () => {
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&includeNutrition=true`);
        const parseResponse = await response.json();
        setRecipeInformation(parseResponse);
      } catch (error) {
        console.log('getRecipeInformation', error.message);
      }
    }
    getRecipeInformation();
  }, [])

  const getNameFromSourceName = (sourceName) => {
    if (sourceName.includes('/')) {
      const parts = sourceName.split('/');
      const replaceCom = parts[0].replace('.com', '');
      const result = replaceCom.charAt(0).toUpperCase() + replaceCom.slice(1);
      return result;
    }
    return sourceName;
  }
  return (
    <>
      {recipe.id ? <Modal className="modal-container" show={show} onHide={() => setShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md={12}>
                <div dangerouslySetInnerHTML={{ __html: recipeInformation.summary }} />
              </Col>
              <Col className="number-of-ingredients" md={12}>
                You have <b>{usedIngredients.length}</b> ingredients out of <b>{usedIngredients.length + missedIngredients.length}</b> total required ingredients.
              </Col>
              <Col md={12}>Owned Ingredients:</Col>
              <Col className="ingredients-container" md={12}>
                {usedIngredients.map((ingredient, index) => {
                  return (
                    <div className="used-ingredient" key={index}>{ingredient.name}</div>
                  )
                })}
              </Col>
              <Col md={12}>Missed Ingredients:</Col>
              <Col className="ingredients-container" md={12}>
                {missedIngredients.map((ingredient, index) => {
                  return (
                    <div className="missed-ingredient" key={index}>{ingredient.name}</div>
                  )
                })}
              </Col>
              <Col md={12}>Cuisine Type(s):</Col>
              <Col className="cuisines-container" md={12}>
                {recipeInformation.dishTypes.map((cuisine, index) => {
                  return (
                    <div className="cuisine" key={index}>{cuisine}</div>
                  )
                })}
              </Col>
              <Col md={12}>
                <a href={recipeInformation.sourceUrl}>Click here for recipe instructions</a>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button variant="primary" onClick={() => setShow(false)}>Favorite</Button>
        </Modal.Footer>
      </Modal> : null}
    </>

  )
}

export default RecipeModal