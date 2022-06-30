const updateRecipeButton = document.getElementById('update-recipe')
const recipeContainer = document.getElementById('recipe')

const getRecipe = () => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php').
    then(response => response.json()).
    then(data => updateRecipe(data.meals[0]))
}

const updateRecipe = recipe => {

  const ingredients = []

  for (let i = 1; i < 20; i++) {
    let ingredient = recipe[`strIngredient${i}`]

    if (ingredient) {
      ingredients.push(`<li>${ingredient} - ${recipe[`strMeasure${i}`]}</li>`)
    }  else {
        break
      }
  }

  recipeContainer.innerHTML = `
  <h2 class="mb-1">${recipe.strMeal}</h2>
  <img class="picture" src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
  <h3 class="mb-1 mt-1">Ingredients</h3>
  <ul>
    ${ingredients.join('')}
  </ul>

  <h3 class="mb-1 mt-1">Instructions</h3>

  <p>
    ${recipe.strInstructions.replace(/\r\n/g, '</p><p>')}
  </p>
  `
}

updateRecipeButton.addEventListener('click', getRecipe)

getRecipe()
