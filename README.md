# Finalproject

## Description
#### Using data acquired from the City of Austin, our team is aiming to create a classification model which will predict 311 call's response time. 

## Goals
#### Create a machine learning model to predict the response times for a 311 call.
#### See how response time is affected by the type of complaints..

## Data Source
#### Data was gathered from "The City of Austin" website
#### https://data.austintexas.gov/Utilities-and-City-Services/Austin-311-Public-Data/xwdj-i9he/data

## Data Exploration
EDA was done with a combination of Tableau Desktop and Python, and is summarized within the "eda write up." 

As a quick summary, I found that calls over time seemed to be increasing until the pandemic's disruption of normal activities. 

Further, within the year itself the spring and summer months see the largest call volume. 

As far as responsive departments, Austin Code receives the most calls, followed by Animal Services and Austin Transportation. Although the "Complaint Types" are not evenly distributed, after summarizing by department response we saw that the distribution is relatively even. 

Finally, when it comes to Response Time, I found that generally calls are closed quickly, with 75% of all calls closed within 5 days. 

## Machine Learning Model
### Preliminary Data Preprocessing
- Because we are focused on 311 ticket completion time, the first step in our data preprocessing was to convert the data in the "sr_created_date" and "sr_closed_date" columns to the DateTime data type using the pandas.to_datetime function. These new DateTime values were assigned to new "Created Date" and "Closed Date" columns respectively. New "Request Year", "Request Month", and "Time of Day" columns were created using the year DateTime information from the "Created Date" column. 
- We then filtered the entire DataFrame using the "Request Year" column to only include those 311 tickets that were created in the year 2019. This large reduction in the dataset was to create a dataframe that had a manageable number of rows given the RAM constraints of our computers. A "Total Seconds" column was created that calculated the total number of seconds each ticket remained open. The DataFrame was then filtered again using the "Total Seconds" column to include only those 311 tickets that were open for < 31540000 seconds (~ 1 year). This was necessary to exclude some extremely large outliers in the dataset. 
- Next, we used the median number of seconds in the "Total Seconds" column to create the cutoff for our new target variable. Tickets that were open for less than or equal to the median response time were labeled with the "Quick Response" descriptor. Tickets that were open for more than the median response time were labeled with the "Slow Response" descriptor. These descriptors were assigned to a new "Response Time" column. 
- Each month integer (i.e., 1 to 12) in the "Request Month" column was transformed to its corresponding month name (i.e., January to December).
- Groups of 4 consecutive hour integers (i.e., 0 to 23 based on a 24-hour time clock) in the "Time of Day" column were transformed into assigned time period descriptors (i.e., early morning, mid morning, late morning, etc.).
- The next major preprocessing step was to group all of the 311 ticket descriptors into various "Department" types. All tickets were categorized as one of the following types: code, animal, public, resource, transport, watershed, park, water, health, housing, or fire.

![Image of 311 Types](https://github.com/GyanwaliEliza/Finalproject/blob/main/311_types.png)

- Each 311 type was then assigned a department descriptor: Austin Code, Animal Services, Public Works, Austin Resource Recovery, Austin Transportation, Watershed Check, Parks and Recreation, Austin Water, Public Health, Housing and Planning, Austin Fire. These descriptors were added to a new "Department" column. 
- Next we had to drop several DataFrame columns that contained information that would not be pertinent to our final machine learning model. These column feature reductions were based on our preliminary machine learning testing, which can be found in the file "MachineLearningModel_Seg1.ipynb". When calculating feature importance, the data in these columns was found to be negligible and considerably slowed down our processing time since most of these columns contained text strings of various lenghts. 

![Image of 311 Drop Columns](https://github.com/GyanwaliEliza/Finalproject/blob/main/311_Drop_Columns.png)

- The final training DataFrame used for the machine learning model was as follows:

![Image of 311 Final Dataframe](https://github.com/GyanwaliEliza/Finalproject/blob/main/311_Final_Dataframe.png)

### Preliminary Feature Engineering and Selection
- Please refer to the file "MachineLearningModel_Seg1.ipynb" for the full scope and code of the feature engineering/selection process. 
- Using a practice sub-dataset from the larger 311 Public Data with only the first 1000 rows, the machine learning model was run to gather preliminary outcomes. 
- Feature importances were provided by the fitted attribute ".feature_importances_", which computes the features as the mean and standard deviation of the accumulation of the impurity decrease within each decision tree of Balanced Random Forest Classifier. Features with high importance can be considered significant enough to improve the accuracy of the machine learning model. 
- The following feature columns consistently had negligible feature importance values and were removed from the final DataFrame:
  - Service Request (SR) Number: 
    - An arbitrary number assigned to each 311 ticket.
  - Map Page + Map Tile + State Plane X Coordinate + State Plane Y Coordinate + Latitude Coordinate + Longitude Coordinate + (Latitude.Longitude) + SR Location: 
    - These location data vary for every single ticket and the number of potential variables meant they all negatively impacted the model accuracy. 
    - The inclusion of these variables significantly increased the script run time and often required more RAM than was available.
  - Street Number + Street Name:
    - Similar to the location data, these number of potential variables negatively impacted the model accuracy. 

### Train, Test, Split
![Image of Train, Test, Split](https://github.com/GyanwaliEliza/Finalproject/blob/main/Train_Test_Split.png)
- Using the scikit-learn "train_test_split" module, the final DataFrame was split into random train and test subsets that could then be input into the Balanced Random Forest Classifier model

### Explanation of Model Choice
- We wanted to use a Balanced Random Forest Classifier for our machine learning model since they run efficiently on extremely large datasets. These algorithms are also robust to nonlinear data and can handle large numbers of input variables without deletion.
- Then main disadvantage of Random Forest algorithms is that they cannot accurately extrapolate new data for regression problems. They can only make classification predictions that are bound by the highest and lowest labels in the training data. For our project, the machine learning model would likely fall apart for ticket response times longer than 1 year since this was the upper bound we created for the DataFrame.    

## Communication
#### Communication done in Slack & in breakout rooms during class time. 

## Dashboard

##### See the following link to look over our plan for our Dashboard https://docs.google.com/presentation/d/1T07JbTtME6sN6u1_7qYxOGOlqq0GUWqQy0iJ8UzBmO8/edit#slide=id.p

## Group
#### Brandon: https://github.com/GyanwaliEliza/Finalproject/tree/jordan_branch
#### Jordan: https://github.com/GyanwaliEliza/Finalproject/tree/jordan_branch
#### Mateo: https://github.com/GyanwaliEliza/Finalproject/tree/Mateo_Branch
#### Eliza: https://github.com/GyanwaliEliza/Finalproject/tree/eliza_branch
