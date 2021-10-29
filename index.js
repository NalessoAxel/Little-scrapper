const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const PORT = 8000;

const app = express();

const url = 'https://www.theguardian.com/international'

axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const articles = [];
        

        $('.fc-item__title', html).each(function() {
        const title = $(this).text()
        const url = $(this).find('a').attr('href') 
        articles.push({
            title,
            url
        });
    })

        

        // console.log("articles:", articles)
        

    }).catch(err => console.log(err))

const urlArticle = "https://www.theguardian.com/world/2021/oct/29/canada-sexual-misconduct-military-scandal"

axios(urlArticle)
    .then(response => {
        const html = response.data;
        
        const $ = cheerio.load(html);
        
        const articlesContent = [];

        $('.dcr-s23rjr', html).each(function() {
            const para = $(this).text()
            
            articlesContent.push({
            para,
            });
        
        })
        console.log("content:", articlesContent)

    }).catch(err => console.log(err))

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
    });