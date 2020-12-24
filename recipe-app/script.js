const meals = document.getElementById("meals");
const favMeals = document.getElementById("favMeals");
getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const respData = await resp.json();
  const randomMeal = respData.meals[0];
  addMeal(randomMeal, true);
}

async function getMealbyId(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const respData = await resp.json();
  const meal = respData.meals[0];

  return meal;
}

async function getMealsBySearch(term) {
  const resp = fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
  const meals = await (await resp).json();
  console.log(meals);
}

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `
    <div class="meal-header">
    ${random ? `<span class="random"> Random Recipe </span>` : ``}
      <img
        src="${mealData.strMealThumb}"
        alt=""
      />
    </div>
    <div class="meal-body">
      <h4>${mealData.strMeal}</h4>
      <button class="fav-btn" onClick> <i class="fas fa-heart"></i></button>
    </div>
   `;
  const btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener("click", () => {
    if (!btn.classList.contains("active")) {
      addMealToLS(mealData.idMeal);
      addFavMeal(mealData);
      btn.classList.add("active");
    } else {
      removeFromLS(mealData.idMeal);
      btn.classList.remove("active");
    }
  });
  meals.appendChild(meal);
}

function addMealToLS(mealId) {
  const mealIds = getMealsFromLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeFromLS(mealId) {
  const mealIds = getMealsFromLS();

  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealsFromLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));

  return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() { 
  const mealIds = getMealsFromLS();

  console.log(mealIds);
  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    console.log(mealIds[i]);
    meal = await getMealbyId(mealId);
    console.log(meal);
    addFavMeal(meal);
  }
}

function addFavMeal(mealData) {
  const favItem = document.createElement("li");

  favItem.innerHTML = `<img
        src=${mealData.strMealThumb}
        alt=${mealData.strMeal}
        /><span>${mealData.strMeal}</span>
        <button class="clear">
        <i class="fas fa-times-circle"></i>
        </button>`;

  const btn = favItem.querySelector(".clear");

  btn.addEventListener("click", () => {
    removeFromLS(mealData.idMeal);
    fetchFavMeals();
  });

  favMeals.appendChild(favItem);
}
