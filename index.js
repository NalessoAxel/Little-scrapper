const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const PORT = 8000;

const app = express();

const url = 'https://www.lemonde.fr/';

axios(url)
	.then((response) => {
		const html = response.data;
		const $ = cheerio.load(html);
		const articles = [];

		$('.article article--main', html).each(function () {
			const title = $(this).text();

			articles.push({
				title,
			});
		});

		console.log('articles:', articles);
	})
	.catch((err) => console.log(err));

const urlArticle =
	'https://www.lemonde.fr/politique/article/2021/10/29/election-presidentielle-2022-macron-l-europeen-mise-sur-sa-difference-face-au-souverainisme-ambiant_6100293_823448.html';

axios(urlArticle)
	.then((response) => {
		const html = response.data;

		const $ = cheerio.load(html);

		const articlesContent = [];

		$('.article__paragraph ', html).each(function () {
			const para = $(this).text();

			articlesContent.push({
				para,
			});
		});
		// console.log('content:', articlesContent);
	})
	.catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
    });