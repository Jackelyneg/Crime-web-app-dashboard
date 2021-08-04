# All About Crime

## Table of Contents
- [Purpose/Questions to be Answered]( https://github.com/Jackelyneg/Crime-Project/edit/main/README.md#Purpose/Questions-to-be-Answered)
- [Overview/Project Summary]( https://github.com/Jackelyneg/Crime-Project/edit/main/README.md#Overview/Project-Summary]
- [List of data sources]( https://github.com/Jackelyneg/Crime-Project/edit/main/README.md#List-of-data-sources)
- [Technologies]( https://github.com/Jackelyneg/Crime-Project/edit/main/README.md#Technologies)
- [Data Exploration]( https://github.com/Jackelyneg/Crime-Project/edit/main/README.md#Data-Exploration)
- [ERD]( https://github.com/Jackelyneg/Crime-Project/edit/main/README.md#ERD)
- [Visualization]( https://github.com/Jackelyneg/Crime-Project/edit/main/README.md#Visualization)
- [Example Queries]( https://github.com/Jackelyneg/Crime-Project/edit/main/README.md#Example-Queries)
- [Conclusions/Inferences]( https://github.com/Jackelyneg/Crime-Project/edit/main/README.md#Conclusions/Inferences)
- [Contacts]( https://github.com/Jackelyneg/Crime-Project/edit/main/README.md#Contacts)
 

 
 
 
 
 
 
 
 
 
## Purpose/Questions to be Answered

Our aim for this project is to find the safest state to live on the East Coast with respect to the Crime Rate. So, are you planning to relocate? Or are you just  interested in researching all the different types of crimes or which type of crime is most prevalent in your state? Do police numbers,iIncome or education affect the crime rate? Look no further, this Dashboard provides you with a comprehensive insight into the world of crime through Interactive Maps,Graphs and Visualizations. Data includes 17 states, 10 different crime types from years 2014 to 2018

 
Keeping our aim in mind some of the burning questions we tried to address in our project are as follows:

What is the safest place to live on the East Coast of the US?
Has the crime rate changed over time?
What factors affect crime rate?
What types of crime are there?
Does Median Income affect the Crime Rate?
Is higher crime rate related to the number of police officers  in the State?
Does the level of education decrease the crime rate in a state?
Can higher crime rates be attributed to a higher population?






















## Overview/Project Summary

With our aim set and our detective hat on we explored different dataset.We focused on 17 east coast states from 2014-2018  to do our research. The states include (Connecticut, Delaware, Florida, Georgia, Massachusetts, Maryland, Maine, North Carolina, New Hampshire, New Jersey, New York, Pennsylvania, Rhode Island, South Carolina, Virginia, Vermont and West Virginia). We targeted 9 different crime types (aggravated assault, arson, burglary, homicide, larceny, motor vehicle theft, property crime, rape, rape legacy, robbery and violent crime) and their numbers from these states.

We were also interested in looking at the relationships between the crimes and the Demographics which include population, education, income and the number of police.  Hence we did an extensive search to get all the data needed from different sources.
Following are the list of sources we used in our project:
     ##List of data sources
- FBI Crime Data (API):
- https://crime-data-explorer.fr.cloud.gov/pages/docApi
- Race Data:
- https://www.kff.org/other/state-indicator/distribution-by-raceethnicity/?currentTi[…]sortModel=%7B%22colId%22:%22Location%22,%22sort%22:%22asc%22%7D
- Demographic Data:
- https://www.census.gov/newsroom/press-releases/2019/acs-5-year.html
- Education Data:
- https://fred.stlouis.fed.org
- Police Data:
- https://crime-data-explorer.fr.cloud.gov



 

## Technologies:

- JavaScript
- Anychart JS
- Plotly JS
- Leaflet
- Flask
- HTML/CSS
- Bootstrap
- PostgreSQL
- Python
- Web API
- Pandas
- Quick DBD

## Data Scrubbing

Worked with over 15 datasets to create final database
Transpose row elements into column elements in a number of tables
Remove unnecessary rows, columns and null values
Merge tables with the State table to include state name and state abbreviation
Merge multiple datasets from different years and different topics into one table
Create a jsonified file into Pandas
##Entity Relationship Diagram


 
 
 
 
 
 
 
 
 
 
 
 
 
 
## Visualizations

Bubble chart/heat map 
Dashboard to view crime trends and patterns
Using Layers of maps, 
 Sun burst: interactive pie chart (attempt)
Search box
R graph from Javascript library
Using leaflet in Javascript library
Javascript library: tabulator
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
## Example Queries:
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
## Conclusions/Inferences made:

We categorized east coast states depending on upon crime rates 
5 Best States PA, NH, ME, NJ, MA
5 worst states: MD, FL, CT, NY, RI
Larceny and property are largest crime types in nearly all states
In 2018, MD had the highest crime rate (82,073) vs. PA which had the lowest crime rate (1,529)
No direct relationship between pop. and crime rate: MD(6,035,802) vs PA(12,800,922)
Possible relationship between crime rate and number of police- MD 2018 police count 16,981 vs PA 25,505
It is interesting to note that even though MD median Income is $87,785 vs PA income $65,693, MD has the highest crime rate. More money, more crime!

## Contacts:

- [Saumya Pandey](https://github.com/saumya-datascience)
- [Andy Jagdeo](https://github.com/Andyjag91)
- [Tricia Toffey](https://github.com/saumya-datascience)
- [Jackelyne Gutierrez](https://github.com//Jackelyneg)
- [Okyere Gyebi](https://github.com/Okyere82)












