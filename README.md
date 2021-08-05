# All About Crime

<img src="https://github.com/Jackelyneg/Crime-Project/blob/main/app/static/images/download.jpg" width="1000" height="400">


## Table of Contents
- [Purpose/Questions to be Answered]( https://github.com/Jackelyneg/Crime-Project/edit/main/README.md#Purpose/Questions-to-be-Answered)
- [Overview/Project Summary]( https://github.com/Jackelyneg/Crime-Project/edit/main/README.md#Overview/Project-Summary)
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

- What is the safest place to live on the East Coast of the US?
- Has the crime rate changed over time?
- What factors affect crime rate?
- What types of crime are there?
- Does Median Income affect the Crime Rate?
- Is higher crime rate related to the number of police officers  in the State?
- Does the level of education decrease the crime rate in a state?
- Can higher crime rates be attributed to a higher population?






















## Overview/Project Summary

With our aim set and our detective hat on we explored different datasets. We focused on 17 east coast states from 2014-2018 to do our research. The states include (Connecticut, Delaware, Florida, Georgia, Massachusetts, Maryland, Maine, North Carolina, New Hampshire, New Jersey, New York, Pennsylvania, Rhode Island, South Carolina, Virginia, Vermont and West Virginia). We targeted 9 different crime types (aggravated assault, arson, burglary, homicide, larceny, motor vehicle theft, property crime, rape, rape legacy, robbery and violent crime) and their numbers from these states.

We were also interested in looking at the relationships between the crimes and the Demographics which include population, education, income and the number of police.  Hence we did an extensive search to get all the data needed from different sources.
Following are the list of sources we used in our project:
     
     
## List of data sources
- FBI Crime Data (API):
 https://crime-data-explorer.fr.cloud.gov/pages/docApi
- Race Data:
 https://www.kff.org/other/state-indicator/distribution-by-raceethnicity/?currentTi[…]sortModel=%7B%22colId%22:%22Location%22,%22sort%22:%22asc%22%7D
- Demographic Data:
 https://www.census.gov/newsroom/press-releases/2019/acs-5-year.html
- Education Data:
 https://fred.stlouis.fed.org
- Police Data:
 https://crime-data-explorer.fr.cloud.gov



 

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

- Worked with over 15 datasets to create final database
- Transpose row elements into column elements in a number of tables
- Remove unnecessary rows, columns and null values
- Merge tables with the State table to include state name and state abbreviation
- Merge multiple datasets from different years and different topics into one table
- Create a jsonified file into Pandas

## Entity Relationship Diagram
![ERD ](https://github.com/Jackelyneg/Crime-Project/blob/main/images/erd.png)






## Example Queries:
### Query for dropdown by year, state and crime:
       offense_type =pd.read_sql(“””SELECT offense 
       FROM crime
       GROUP BY offense
       ORDER BY offense;”””, engine)
       
       state_type=pd.read_sql(“””SELECT state
       FROM state_table
       GROUP BY state
       ORDER BY state;”””,engine)
       
       year_df=pd.read_sql(“””SELECT year
       FROM all_crime
       GROUP BY year 
       ORDER BY year;”””,engine)
       
 ### Sunburst query:
      
      sunbur_type=pd.read_sql(f”””SELECT year, state_abbr,offense,crime_reported
      FROM all_crime 
      WHERE year={query_year};”””,engine)
      
      
 ### Demographics Table:

    demo_type = pd.read_sql(f”””select demographics.population, demographics.year, demographics.officer_count,
    all_crime.state_abbr, all_crime.state, all_crime.crime_reported, all_crime.offense
    FROM all_crime
    LEFT JOIN demographics
    on call_crime.state_abbr =demographics.state_abbr
    AND all_crime.year=demographics.year
    WHERE all_crime.offense = ‘{crime}”
    AND all_crime.state=’{state}’
    AND all_crime.year={newyear};”””,engine)

 
    tot_state_crime=pd.read_sql(“””SELECT state_abbr, sum(crime_reported) as tot_state_crime
    FROM all_crime
    GROUP BY state_abbr;”””, engine)
 
    tot_year_df=pd.read_sql(“””SELECT sum(crime_reported) as tot_year_crime
    FROM all_crime;”””,engine)
   
   
### Query for Choropleth
- (color intensity map where in intensity was populated with crime reported for that state for a given year)

    
      dict_crime=pd.read_sql(f”””SELECT offense, crime_reported, state
      FROM all_crime where offense=’{crime}’ AND year=’{newyear}’;”””, engine)
      
### Query for Bar Chart
    State_data_type = pd.read_sql(f””” SELECT DISTINCT s.state, d.year, d.population as Population, d.officer_count a
    Officer_count, d.education ad Degree_holders, d.income as income, coalesce(p.Total_Crimes, 0) as Crimes
    FROM state_table as s 
    LEFT JOIN demographics as d 
    ON d.state_abbr = s.state_abbr
    LEFT JOIN
    (SELECT state,year, SUM(CAST(crime_reported as int)) as Total_Crimes
    FROM all_crime
    WHERE state LIKE ‘{state}’


 
 
 
 
 
 
 
 
 
 
 
 
 
 
## Visualizations

## Panel
## Demographic Info Panel 
 This panel consist of three dropdowns that are interactive. It consist of Crime_type,state_type and the year dropdowns.By selecting one of the crimetypes in the dropdown and 
 selecting one of the state in the state_type dropdown and lastly selecting one of the year, it pulls  all the data from the database corresponding to the data selected and populates it to the demographic info Panel.This helps users to know exactly the information they need to take decisions on where to relocate to.
![Dashboard](https://github.com/Jackelyneg/Crime-Project/blob/main/images/dashboard_Dropdowns.jpg)

The diagram below depicts exactly what happens when you select the dropdowns.
![Panel](https://github.com/Jackelyneg/Crime-Project/blob/main/images/Demographics%20%20panel.jpg)
## Crimes Reported for diffrenet Crime Types understudy per State Per Year
Sunburst Plot was used to provide a comprehensive Visualization of the different crime types reported per State per Year.
AnyChart a lightweight and robust Javascript Charting Library was used to plot the sunburst.
The plot is populated by the year dropdown and siaplays data(crime reported) for all the states for the year selected.
For 2018 we could visualize that the  worst Crime affected state was Maryland while the least was Pensylvania.
when we expanded the particular state, irrespective of the fact that they were either best or worst affected state, property Crime and Larceny were the maximum reported crimes.

<img src="https://github.com/Jackelyneg/Crime-Project/blob/main/images/sunburst1.png" width="400" height="400">

### Sunburst MD

<img src="https://github.com/Jackelyneg/Crime-Project/blob/main/images/sunburstMD.png" width="400" height="400">

### Sunburst PA

<img src="https://github.com/Jackelyneg/Crime-Project/blob/main/images/sunburstPA.png" width="400" height="400">


#### Challenges Faced: The sunburst takes the json/XML/CSV in a specific format. To convert the dataframe we got from the query into the specific format was challenging.




### Bar chart
The bar chart displays summary data for all of the states in our dataset for the five years we analyzed (2014-2018) including totals for population, income, crime and police. This data helped in exploring possible relationships between crime and population, crime and number of police and crime and income. 
![BarChart](https://github.com/Jackelyneg/Crime-Project/blob/main/app/static/images/BarChart.png)

## Choropleth maps to depict the Crime data on the East Coast geographical map.
We created a interactive Choropleth map of the Crime Density of the East Coast states with the help of GeoJSON.The map is reponsive with the Year as well as Crime Type.
### Choropleth
![ChoroPleth](https://github.com/Jackelyneg/Crime-Project/blob/main/images/choropeth-map.png)

#### Challenges Faced: From the query we got a regulat json but the choropleth uses only geojson. Codes were written to add a crime-reported property to the GeoJson.


Choropleth maps are popular thematic maps used to represent statistical data through various shading patterns or symbols on predetermined geographic areas (i.e. countries). They are good at utilizing data to easily represent variability of the desired measurement, across a region






       
       
 
      
      
      

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
## Conclusions/Inferences made:

To conclude our analysis, we categorized east coast states depending upon crime rates. Our analysis shows the 5 best states with the least amount of crime (PA, NH, ME, NJ, MA) and the 5 worst states with the greatest amount of crime (MD, FL, CT, NY, RI) on the east coast. This was determined by the count on our bar chart on the number of crimes committed and the density of the crime in our choropleth map. Through further analysis, we discovered that larceny and property crimes are the largest crime types in nearly all states. We decided to use the states with the minimum and maximum crimes reported for our analysis. In 2018, Maryland (MD) had the highest crime rate (82,073) vs. Pennsylvania (PA) which had the lowest crime rate (1,529). Using these states, the data showed no direct relationship between population and crime rate. MD has a total population of 6,035,802 vs PA with a population of 12,800,922. As you can see, PA has a much higher population than MD, yet MD has more crimes reported. However, even though the population has no direct relationship, there is a possible relationship between crime rate and number of police MD 2018 police count 16,981 vs PA 25,505. There are more police in PA than in MD It is also interesting to note that even though MD median Income is $87,785 vs PA income $65,693, MD has the highest crime rate. More money, more crime!

## Contacts:

- [Saumya Pandey](https://github.com/saumya-datascience)
- [Andy Jagdeo](https://github.com/Andyjag91)
- [Tricia Toffey](https://github.com/ttoffey)
- [Jackelyne Gutierrez](https://github.com//Jackelyneg)
- [Okyere Gyebi](https://github.com/Okyere82)












