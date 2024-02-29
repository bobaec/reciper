import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../styling/RecipeModal.scss';

const RecipeModal = ({ show, setShow, recipe, isAuthenticated }) => {
	const { image, summary, sourceUrl, title, id, likes, missedIngredients, usedIngredients } = recipe;
	const [recipeInformation, setRecipeInformation] = useState({});
	const [favoriteRecipeIds, setFavoriteRecipeIds] = useState("");
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
		getFavoriteRecipes();
	}, [recipe, favoriteRecipeIds])

	const hasIngredients = () => {
		return missedIngredients?.length > 0 || usedIngredients?.length > 0;
	}

	const getFavoriteRecipes = async () => {
		try {
			const response = await fetch('http://localhost:5000/recipes/get-favorite-recipes', {
				method: "GET",
				headers: {
					"Content-Type": "text/plain",
					token: localStorage.token
				}
			})
			const parseResponse = await response.json();
		} catch (error) {
			console.log('getRecipes', error.message);
		}
	}

	const saveRecipe = async (recipe_id) => {
		try {
			const response = await fetch("http://localhost:5000/recipes/save-recipe", {
				method: "POST",
				headers: {
					"Content-Type": "text/plain",
					token: localStorage.token,
				},
				body: recipe_id,
			})
			const parseResponse = await response.json();
			setShow(false);
		} catch (error) {
			console.log('saveRecipe', error.message);
		}
	}

	return (
		<>
			{recipe?.id ? <Modal className="modal-container" show={show} onHide={() => setShow(false)} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<Row>
							<Col className="recipe-summary" md={12}>
								<div dangerouslySetInnerHTML={{ __html: recipeInformation.summary }} />
							</Col>
							{hasIngredients() ? <>
								<Col className="number-of-ingredients" md={12}>
									You have <b>{usedIngredients.length}</b> ingredients out of <b>{usedIngredients.length + missedIngredients.length}</b> total required ingredients.
								</Col>
								<Col className="owned-ingredients-container" md={12}>
									<Col md={12}>Owned Ingredients:</Col>
									<Col className="ingredients" md={12}>
										{usedIngredients.map((ingredient, index) => {
											return (
												<div className="used-ingredient" key={index}>{ingredient.name}</div>
											)
										})}
									</Col>
								</Col>
								<Col className="ingredients-container" md={12}>
									<Col md={12}>Missed Ingredients:</Col>
									<Col className="ingredients" md={12}>
										{missedIngredients.map((ingredient, index) => {
											return (
												<div className="missed-ingredient" key={index}>{ingredient.name}</div>
											)
										})}
									</Col>
								</Col>
							</> : null}
							{recipeInformation?.dishTypes?.length ? <Col md={12} className="cuisines-container">
								<Col md={12}>Cuisine Type(s):</Col>
								<Col className="cuisines" md={12}>
									{recipeInformation?.dishTypes.map((cuisine, index) => {
										return (
											<div className="cuisine" key={index}>{cuisine}</div>
										)
									})}
								</Col>
							</Col> : null}
							<Col className="recipe-instructions" md={12}>
								<a href={recipeInformation.sourceUrl} target="_blank" rel="noreferrer">Click here for recipe instructions</a>
							</Col>
						</Row>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
					{isAuthenticated ? <Button variant={!favoriteRecipeIds?.includes(recipe.id) ? 'primary' : 'danger'} onClick={() => saveRecipe(recipe.id)}>{!favoriteRecipeIds?.includes(recipe.id) ? 'Save' : 'Remove'}</Button> : null}
				</Modal.Footer>
			</Modal> : null}
		</>

	)
}

export default RecipeModal;