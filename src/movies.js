// Iteration 1: Get all directors
function getAllDirectors(movies) {
  return movies.map(movie => movie.director);
}

// Bonus 1.1: Get all unique directors
function getAllDirectorsUnique(movies) {
  const allDirectors = movies.map(movie => movie.director);
  return [...new Set(allDirectors)];
}

// Iteration 2: How many Spielberg drama movies
function howManyMovies(movies) {
  return movies.filter(movie => 
    movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')
  ).length;
}

// Iteration 3: Average score of all movies
function scoresAverage(movies) {
  if (!movies.length) return 0;
  const totalScore = movies.reduce((sum, movie) => sum + (movie.score || 0), 0);
  return Number((totalScore / movies.length).toFixed(2));
}

// Iteration 4: Average score of drama movies
function dramaMoviesScore(movies) {
  const dramaMovies = movies.filter(movie => movie.genre.includes('Drama'));
  return scoresAverage(dramaMovies);
}

// Iteration 5: Order by year (ascending), then alphabetically by title
function orderByYear(movies) {
  return movies.slice().sort((a, b) => {
    if (a.year === b.year) return a.title.localeCompare(b.title);
    return a.year - b.year;
  });
}

// Iteration 6: Alphabetic order of first 20 titles
function orderAlphabetically(movies) {
  return movies
    .map(movie => movie.title)
    .sort((a, b) => a.localeCompare(b))
    .slice(0, 20);
}

// Bonus 7: Convert duration to minutes
function turnHoursToMinutes(movies) {
  return movies.map(movie => {
    const newMovie = { ...movie };
    let hours = 0, minutes = 0;

    if (newMovie.duration.includes('h')) {
      hours = parseInt(newMovie.duration.split('h')[0]);
      if (newMovie.duration.includes('min')) {
        minutes = parseInt(newMovie.duration.split(' ')[1].replace('min',''));
      }
    } else if (newMovie.duration.includes('min')) {
      minutes = parseInt(newMovie.duration.replace('min',''));
    }

    newMovie.duration = hours * 60 + minutes;
    return newMovie;
  });
}

// Bonus 8: Best yearly average score
function bestYearAvg(movies) {
  if (!movies.length) return null;

  const yearScores = {};
  movies.forEach(movie => {
    if (!yearScores[movie.year]) yearScores[movie.year] = [];
    yearScores[movie.year].push(movie.score);
  });

  let bestYear = null;
  let bestAvg = 0;

  for (const year in yearScores) {
    const scoresArray = yearScores[year].map(score => ({ score }));
    const avg = scoresAverage(scoresArray);
    if (avg > bestAvg || (avg === bestAvg && year < bestYear)) {
      bestYear = year;
      bestAvg = avg;
    }
  }

  return `The best year was ${bestYear} with an average score of ${bestAvg}`;
}

// Don't forget to export functions if using modules
// module.exports = { getAllDirectors, getAllDirectorsUnique, howManyMovies, scoresAverage, dramaMoviesScore, orderByYear, orderAlphabetically, turnHoursToMinutes, bestYearAvg };
