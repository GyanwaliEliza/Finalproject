# Finalproject

## Description
#### Using data acquired from the City of Austin, our team is aiming to create a classification model which will predict 311 call's response time. 

## Goals
#### Create a machine learning model to predict the response times for a 311 call.
#### See how response time is affected by the type of complaints..

## Data Source
#### Data was gathered from "The City of Austin" website
#### https://data.austintexas.gov/Utilities-and-City-Services/Austin-311-Public-Data/xwdj-i9he/data

## Machine Learning Model
### Preliminary Data Preprocessing
- Because we are focused on 311 ticket completion time, the first step in our data preprocessing was to convert the data in the "sr_created_date" and "sr_closed_date" columns to the DateTime data type using the pandas.to_datetime function. These new DateTime values were assigned to new "Created Date" and "Closed Date" columns respectively. Another new "Request Year" column was created using the year DateTime information from the "Created Date" column. We then filtered the entire DataFrame using the "Request Year" column to only include those 311 tickets that were created in the year 2019. This large reduction in the dataset was to create a dataframe that had a manageable number of rows given the RAM constraints of our computers. A "Total Seconds" column was created that calculated the total number of seconds each ticket remained open. The DataFrame was then filtered again using the "Total Seconds" column to include only those 311 tickets that were open for < 31540000 seconds (~ 1 year). This was necessary to exclude some extremely large outliers in the dataset. 
- Next, we used the median number of seconds in the "Total Seconds" column to create the cutoff for our new target variable. Tickets that were open for less than or equal to the median response time were labeled with the "Quick Response" descriptor. Tickets that were open for more than the median response time were labeled with the "Slow Response" descriptor. These descriptors were assigned to a new "Response Time" column. 
- The next major preprocessing step was to group all of the 311 ticket descriptors into various "Department" types. All tickets were categorized as one of the following types: code, animal, public, resource, transport, watershed, park, water, health, housing, or fire.

![Image of 311 Types](https://github.com/GyanwaliEliza/Finalproject/blob/main/311_types.png)

- Each 311 type was then assigned a department descriptor: Austin Code, Animal Services, Public Works, Austin Resource Recovery, Austin Transportation, Watershed Check, Parks and Recreation, Austin Water, Public Health, Housing and Planning, Austin Fire. These descriptors were added to a new "Department" column. 
- Next we had to drop several DataFrame columns that contained information that would not be pertinent to our final machine learning model. These column feature reductions were based on our preliminary machine learning testing, which can be found in the file "MachineLearningModel_Seg1.ipynb". When calculating feature importance, the data in these columns was found to be negligible and considerably slowed down our processing time since most of these columns contained text strings of various lenghts. 

![Image of 311 Drop Columns](https://github.com/GyanwaliEliza/Finalproject/blob/main/311_Drop_Columns.png)

- The final training DataFrame used for the machine learning model was as follows:

![Image of 311 Final Dataframe](https://github.com/GyanwaliEliza/Finalproject/blob/main/311_Final_Dataframe.png)

## Communication
#### Communication done in Slack & in breakout rooms during class time. 

## Dashboard

##### See the following link to look over our plan for our Dashboard https://docs.google.com/presentation/d/1T07JbTtME6sN6u1_7qYxOGOlqq0GUWqQy0iJ8UzBmO8/edit#slide=id.p

## Group
#### Brandon: https://github.com/GyanwaliEliza/Finalproject/tree/jordan_branch
#### Jordan: https://github.com/GyanwaliEliza/Finalproject/tree/jordan_branch
#### Mateo: https://github.com/GyanwaliEliza/Finalproject/tree/Mateo_Branch
#### Eliza: https://github.com/GyanwaliEliza/Finalproject/tree/eliza_branch



